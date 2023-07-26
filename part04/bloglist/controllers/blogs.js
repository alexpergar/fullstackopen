const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

router.post('/', async (request, response, next) => {
  // Verify token and get user
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'user not found' })
  }

  // Save the blog
  let blog = new Blog({...request.body, 'user': user._id})
  const savedBlog = await blog.save()

  // Save the note ID in the user
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response, next) => {
  // Verify token and get user
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json({ error: 'user not found' })
  }

  // Find blog and verify ownership
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({error: 'can only remove blogs you own' })
  }
  // await Blog.findByIdAndRemove(request.params.id)
  await blog.deleteOne()
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