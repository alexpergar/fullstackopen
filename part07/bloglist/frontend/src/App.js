import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { createNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from './reducers/blogReducer'
import { getCachedUser, login, logout } from './reducers/userReducer'
import { sortedBlogsSelector } from './utils/sorter'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getCachedUser())
  }, [])

  const blogs = useSelector(sortedBlogsSelector)
  const user = useSelector((state) => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(login(username, password))
      setUsername('')
      setPassword('')
      notify('You logged in', 'success')
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  const handleLogout = async () => {
    await dispatch(logout())
    notify('You logged out', 'success')
  }

  // Blog events
  const handleLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog))
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  const handleRemove = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return
    }
    try {
      dispatch(removeBlog(blog))
      notify(`the blog ${blog.title} by ${blog.author} was deleted`, 'success')
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  // Blog form
  const handleCreateBlog = async (title, author, url, likes) => {
    try {
      const newBlog = {
        title,
        author,
        url,
        likes,
        user: user,
      }
      dispatch(createBlog(newBlog))
      notify(
        `a new blog ${newBlog.title} by ${newBlog.author} was added`,
        'success'
      )
    } catch (exception) {
      notify(exception.response.data.error)
    }
  }

  const notify = (message, style) => {
    dispatch(createNotification(message, style, 3))
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username-input'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password-input'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type='submit'>
            login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification />
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='new blog'>
        <h2>create new blog</h2>
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      <h2>blogs</h2>
      {blogs.map((blog) => {
        const isOwner = blog.user.username === user.username
        return (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={handleLike}
            deleteBlog={handleRemove}
            isOwner={isOwner}
          />
        )
      })}
    </div>
  )
}

export default App
