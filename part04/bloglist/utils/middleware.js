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

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
    tokenExtractor,
    errorHandler
}