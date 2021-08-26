const express = require('express')
const config = require('config')    //  отдельный config файл
const mongoose = require('mongoose')

const app = express()

const PORT = config.get('port') || 5000
const uri = config.get('mongoUri')

async function start() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`server has been started on port ${PORT}...`))
    } catch (e) {
        console.log('server error', e.message)
        process.exit(1)
    }
}

start()
