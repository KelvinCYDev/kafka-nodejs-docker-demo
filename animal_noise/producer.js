const { Kafka } = require("kafkajs");
const {
  KAFKA: { BROKERS, CLIENT_ID, TOPIC },
} = require("../config");

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKERS,
});
const producer = kafka.producer();
console.log("Connecting to Kafka . . .");

function getRandomAnimal() {
  const categories = ["CAT", "DOG"];
  return categories[Math.floor(Math.random() * categories.length)];
}

function getRandomNoise(animal) {
  if (animal === "CAT") {
    const noises = ["meow", "purr"];
    return noises[Math.floor(Math.random() * noises.length)];
  } else if (animal === "DOG") {
    const noises = ["bark", "woof"];
    return noises[Math.floor(Math.random() * noises.length)];
  } else {
    return "silence..";
  }
}

let i = 0;

const run = async () => {
  await producer.connect();
  console.log("Connected to Kafka !!");
  setInterval(async () => {
    let category = getRandomAnimal();
    let noise = getRandomNoise(category);
    let event = { category, noise };
    try {
      const result = await producer.send({
        topic: "Anmial",
        messages: [
          {
            key: `key-${i}`,
            value: JSON.stringify(event),
          },
        ],
      });
      i++;
      console.log(
        `Sent key-${i}: Animal: ${category} Noise: ${noise} ${JSON.stringify(
          result
        )}`
      );
    } catch (e) {
      return console.error(`[example/producer] ${e.message}`, e);
    }
  }, 2000);
};

run().catch((e) => console.error(`Err: ${e.message}`, e));

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

// errorTypes.forEach((type) => {
//   process.on(type, async () => {
//     try {
//       console.log(`process.on ${type}`);
//       await producer.disconnect();
//       process.exit(0);
//     } catch (_) {
//       process.exit(1);
//     }
//   });
// });

signalTraps.forEach((type) => {
  process.once(type, async () => {
    try {
      await producer.disconnect();
    } finally {
      process.kill(process.pid, type);
    }
  });
});
