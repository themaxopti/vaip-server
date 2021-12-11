const express = require('express')

const mongoose = require('mongoose')
const Cors = require('cors')
const path = require('path')
const config = require('config')

const app = express()

app.use(Cors())
app.use(express.json({ extended: true }))

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

    } catch (e) {
        console.log(e)
    }
}

start()

const PORT = process.env.PORT || config.get('port')

app.listen(PORT,()=>{
    console.log(`server has been started on port ${PORT}`)
})