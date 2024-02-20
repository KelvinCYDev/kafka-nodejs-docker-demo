const { Kafka } = require("kafkajs");
const {
  KAFKA: { BROKERS, CLIENT_ID, CONSUMER_GROUP_ID },
} = require("../config");

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: CLIENT_ID,
      brokers: BROKERS,
    });

    const consumer = kafka.consumer({ groupId: CONSUMER_GROUP_ID });
    console.log("Connecting to Kafka . . .");
    await consumer.connect();
    console.log("Connected to Kafka !!");

    await consumer.subscribe({
      topic: "Anmial",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        let res = JSON.parse(result.message.value);
        console.log(
          `Received message: Animal: ${res.category} noise: ${res.noise}`
        );
      },
    });
  } catch (err) {
    console.error(`ERROR::CONSUMER:: ${err}`);
  }
}
