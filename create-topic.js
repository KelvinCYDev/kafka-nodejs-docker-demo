const { Kafka } = require("kafkajs");
const {
  KAFKA: { BROKERS, CLIENT_ID, TOPIC },
} = require("./config");

const topic = process.argv[2] || TOPIC;

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: CLIENT_ID,
      brokers: BROKERS,
    });

    const admin = kafka.admin();
    console.log("Connecting to Kafka . . .");
    await admin.connect();
    console.log("Connected to Kafka !!");

    await admin.createTopics({
      topics: [
        {
          topic: topic,
          numPartitions: 2,
        },
      ],
    });

    console.log(`Topic - ${topic} Created Successfully!`);
    await admin.disconnect();
  } catch (err) {
    console.error(`ERROR::TOPIC:: ${err}`);
  }
}
