const { Kafka, logLevel } = require('kafkajs')
const config = require('./config')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: config.KAFKA_BROKERS.split(",").map(String),
    connectionTimeout: 3000,
    logLevel: logLevel.DEBUG,
    retry: {
        initialRetryTime: 100,
        retries: 8
    }
})

async function startConsumer() {
    let consumerCount = 0
    const consumer = kafka.consumer({ groupId: 'sensorcloud-kafka-consumer' })

    try {
        await consumer.connect()
        await consumer.subscribe({ topic: config.KAFKA_TOPIC})
    } catch (err) {
        throw new Error(`Failed to start Kafka consumer: ${err.message}`)
    }

    await consumer.run({
        eachMessage: async({
            topic, partition, message
        }) => {
            consumerCount++
            console.log({
                topic: topic,
                messageCount: consumerCount,
                timestamp: new Date(Date.now())
            })
        }
    })
}

module.exports = startConsumer