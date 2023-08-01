import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')
  const [notificationClass, setNotificationClass] = useState('')
  const [user, setUser] = useState(null)


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

  const notify = (message, style) => {
    setNotification(message)
    setNotificationClass(style)
    setTimeout(() => setNotification(null), 3000)
  }

  useEffect(() => {
    blogService.getAll()
    .then(blogs => {
      blogs.sort((a, b) => {
        if (a.likes > b.likes) return -1
        else return 1
      })
      setBlogs( blogs )
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
      <Togglable buttonLabel='new blog'>
        <h2>create new blog</h2>
        <BlogForm blogs={blogs} setBlogs={setBlogs} notify={notify} user={user}/>
      </Togglable>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} notify={notify}/>
      )}
    </div>
  )

}

export default App