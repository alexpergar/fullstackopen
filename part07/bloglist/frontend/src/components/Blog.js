import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useMatch, useNavigate } from 'react-router-dom'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

const BlogItem = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const blogMatch = useMatch('/blogs/:id')
  const blogs = useSelector((state) => state.blogs)
  const loggedUser = useSelector((state) => state.user)

  useEffect(() => {
    if (blogs.length !== 0) {
      const targetBlog = blogs.find((b) => b.id === blogMatch.params.id)
      if (targetBlog) {
        setBlog(targetBlog)
      } else {
        setBlog({ notFound: true })
      }
    }
  }, [blogs])

  const isOwner = blog && blog.user.username === loggedUser.username
  const removeButton = isOwner ? (
    <button onClick={() => handleRemove(blog)}>Delete</button>
  ) : null

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))
    } catch (exception) {
      dispatch(createNotification(exception.response.data.error, 'error', 3))
    }
  }

  const handleRemove = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return
    }
    try {
      dispatch(removeBlog(blog))
      dispatch(
        createNotification(
          `the blog ${blog.title} by ${blog.author} was deleted`,
          'success',
          3
        )
      )
      navigate('/blogs')
    } catch (exception) {
      dispatch(createNotification(exception.response.data.error, 'error', 3))
    }
  }

  const handleCreateComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    dispatch(commentBlog(blog, comment))
    event.target.comment.value = ''
  }

  if (!blog) {
    return (
      <div>
        <Link to='/blogs'>Go back</Link>
        <p>Loading...</p>
      </div>
    )
  }

  if (blog.notFound) {
    return (
      <div>
        <Link to='/blogs'>Go back</Link>
        <h2>Blog not found</h2>
      </div>
    )
  }

  return (
    <div>
      <Link to='/blogs'>Go back</Link>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <div>
        <p>
          URL: <a>{blog.url}</a>
        </p>
        <p>
          Number of likes: <b>{blog.likes}</b>
          <button onClick={() => handleLike(blog)}>Click to like</button>
        </p>
        <p>
          Blog added by: <b>{blog.user.name}</b>
        </p>
        {removeButton}
      </div>

      <form onSubmit={handleCreateComment}>
        <h3>Comments</h3>
        <span>
          <input
            id='comment'
            type='text'
            name='Comment'
            placeholder='Write your comment...'
          />
        </span>
        <button id='blog-button' type='submit'>
          Add comment
        </button>
      </form>

      <ul>
        {blog.comments.map((comment) => {
          return <li key={comment.id}>{comment.content}</li>
        })}
      </ul>
    </div>
  )
}

export default BlogItem
