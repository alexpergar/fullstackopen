import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { createNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notify('You logged in', 'success')
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
    notify('You logged out', 'success')
  }

  // Blog events
  const likeBlog = async (blog) => {
    try {
      const likedBlog = await blogService.likeBlog(blog)
      let modBlogs = blogs.map((b) => (b.id === blog.id ? likedBlog : b))
      modBlogs.sort((a, b) => {
        if (a.likes > b.likes) return -1
        else if (a.likes < b.likes) return 1
        else return a.title.localeCompare(b.title)
      })
      setBlogs(modBlogs)
    } catch (exception) {
      console.log(exception)
      notify(exception.response.data.error, 'error')
    }
  }

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return
    }
    try {
      blogService.deleteBlog(blog)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  // Blog form
  const createBlog = async (title, author, url, likes) => {
    try {
      const newBlog = await blogService.createBlog({
        title,
        author,
        url,
        likes,
      })
      newBlog.user = user
      setBlogs(blogs.concat(newBlog))
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

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => {
        if (a.likes > b.likes) return -1
        else if (a.likes < b.likes) return 1
        // If not, order alphabetially
        else return a.title.localeCompare(b.title)
      })
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

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
      <button onClick={logout}>logout</button>
      <Togglable buttonLabel='new blog'>
        <h2>create new blog</h2>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <h2>blogs</h2>
      {blogs.map((blog) => {
        const isOwner = blog.user.username === user.username
        return (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            isOwner={isOwner}
          />
        )
      })}
    </div>
  )
}

export default App
