const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use((error, request, response, next) => {
  if (error.name === 'ValidationError') {
      return response.status(400).json({error: error.message})
  }
  next(error)
})
app.use((request, response) => {
response.status(404).send({ error: 'unknown endpoint'})
})
  

module.exports = app