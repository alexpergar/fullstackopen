import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')
  const [notificationClass, setNotificationClass] = useState('')
  const [user, setUser] = useState(null)
  // Create blog variables
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
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

  const createBlog = async (event) => {
    event.preventDefault()

    const likes = 0
    try {
      const blog = await blogService.createBlog({
        title, author, url, likes
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      notify(`a new blog ${blog.title} by ${blog.author} was added`, 'success')
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  const notify = (message, style) => {
    setNotification(message)
    setNotificationClass(style)
    setTimeout(() => setNotification(null), 3000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <Notification message={notification} notificationClass={notificationClass}/>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
            </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification} notificationClass={notificationClass}/>
      {user.username} logged in
      <button onClick={logout}>logout</button>
      <h2>create new blog</h2>
      <form onSubmit={createBlog}>
        <div>
          title: <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author: <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url: <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App