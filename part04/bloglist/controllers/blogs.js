const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

router.post('/', async (request, response, next) => {
  const users = await User.find({})
  const randomUser = users[0]

  // Save the blog
  let blog = new Blog({...request.body, 'user': randomUser._id})
  const savedBlog = await blog.save()

  // Save the note ID in the user
  randomUser.blogs = randomUser.blogs.concat(savedBlog._id)
  await randomUser.save()

  response.status(201).json(savedBlog)
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