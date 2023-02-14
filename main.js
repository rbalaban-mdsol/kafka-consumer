const express = require('express')
const startConsumer = require('./consumer')

const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.send('Ok').status(200)
})

app.listen(port, () => {
    console.log(`Kafka consumer app listening on port ${port}`)
})

startConsumer()
    .then(() => {
        console.log('Kafka consumer started')
    })
    .catch((err) => {
        console.error(`Failed to start Kafka consumer: ${err}`)
    });