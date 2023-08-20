const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {

    const getTokenFrom = request => {
      const authorization = request.get('authorization')
      if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
      } 
      return null
    }
    request.token = getTokenFrom(request)
    next()
}


const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    request.user = await User.findById(decodedToken.id)
    if (!request.user) {
      return response.status(400).json({ error: 'user not found' })
    }
    next()
}


const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  } if (error.name === 'CastError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
    tokenExtractor,
    userExtractor,
    errorHandler
}