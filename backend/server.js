require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// Express App
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Routes
app.use('/api/workouts', workoutRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to DataBase')
    // Listen to Port
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on PORT', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 