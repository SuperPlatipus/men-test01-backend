require('dotenv').config()

const express = require('express')

const cors = require('cors')

const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const testRoutes = require('./routes/tests')

const app = express()

// middleware

app.use(cors())

// app.use(express.json())

app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
app.use('/api/tests', testRoutes)


// connect to db

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Listening port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


