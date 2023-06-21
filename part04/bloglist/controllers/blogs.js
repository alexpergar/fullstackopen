const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

router.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

router.put('/:id', async (request, response, next) => {
  const result = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context:'query' })
    
  response.json(result)
})

module.exports = router