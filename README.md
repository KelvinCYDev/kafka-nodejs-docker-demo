# Kafka-nodejs demo with docker
Simple Kafka demos to boot up kafka service with docker and nodejs scripts to create a topic, a consumer listening to the topic and a producer to publish message to a topic.

### Boot Zookeeper and Kafka
Initial Docker compose up to create image and run container.
```sh
        $ docker-compose up -d
```
Secondary docker commands to start/stop containers.
```sh
        $ docker-compose stop
        $ docker-compose start
```
### Kafka Node scripts
 * `node create-topic.js topic_name`  - creates a kafka topic with specified number of partitions, e.g. "Animal".

#### /animal_noise
 * `node animal_noise/producer.js` - publishes message (random animal name and noise) periodically to a kafka topic "Animal". 
 * `node animal_noise/consumer.js` - subscribes/listens to kafka topic "Animal" for published/incoming messages.

#### /topic_demo
 * `node topic_demo/producer.js message_one 1` - publishes message to a kafka topic to the specified partition. 
 * `node topic_demo/consumer.js` - subscribes/listens to kafka topic for published/incoming messages.