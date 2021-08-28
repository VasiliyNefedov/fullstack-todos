const express = require('express')
const config = require('config')    //  отдельный config файл
const mongoose = require('mongoose')
const auth = require('./routes/auth.routes')    //  роут аутентификации
const cors = require('cors')

const app = express()

// const corsOptions = {
//     credentials: true,
//     origin: 'http://localhost:5000',  // сменил на http://<имя моего домена>
//     allowedHeaders: ['Content-Type'],
//     optionsSuccessStatus: 200
// };

app.use(cors())
app.use(express.json({extended: true}))
app.use('/api/auth', auth)

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
