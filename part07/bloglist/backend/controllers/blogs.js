const router = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user').populate('comments')
  response.json(blogs)
})

router.post('/', middleware.userExtractor, async (request, response, next) => {
  const user = request.user

  // Save the blog
  let blog = new Blog({ ...request.body, user: request.user._id })
  const savedBlog = await blog.save()

  // Save the note ID in the user
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  await savedBlog.populate('user')
  response.status(201).json(savedBlog)
})

router.put(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    const user = request.user

    // Find blog and verify ownership
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(401)
        .json({ error: 'can only modify blogs you own' })
    }

    // 'Unpack' the comments IDs so that mongoose can cast them
    request.body.comments = request.body.comments.map((comment) => comment.id)

    const putBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
        context: 'query',
        populate: { path: 'user' },
      }
    )

    response.status(200).json(putBlog)
  }
)

router.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    const user = request.user

    // Find blog and verify ownership
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(401)
        .json({ error: 'can only remove blogs you own' })
    }

    await blog.deleteOne()
    response.status(204).end()
  }
)

router.post(
  '/:id/comments',
  middleware.userExtractor,
  async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)

    // Save the comment
    let comment = new Comment({ ...request.body, blog: blog })
    const savedComment = await comment.save()

    // Save the comment ID on the blog
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    await savedComment.populate('blog')
    response.status(201).json(savedComment)
  }
)

module.exports = router
