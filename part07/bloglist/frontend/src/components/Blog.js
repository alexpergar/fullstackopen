import { useEffect, useState } from 'react'
import '../styles/index.css'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { Link, useMatch, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
    <button onClick={() => handleRemove(blog)}>remove</button>
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

  if (!blog) {
    return (
      <div>
        <Link to='/blogs'>go back</Link>
        <p>Loading...</p>
      </div>
    )
  }

  if (blog.notFound) {
    return (
      <div>
        <Link to='/blogs'>go back</Link>
        <h2>Blog not found</h2>
      </div>
    )
  }

  return (
    <div>
      <Link to='/blogs'>go back</Link>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <div>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
        {removeButton}
      </div>
    </div>
  )
}

export default BlogItem
