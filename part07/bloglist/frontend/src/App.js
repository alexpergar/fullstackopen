import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { createNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { getCachedUser, logout } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getCachedUser())
  }, [])

  const user = useSelector((state) => state.user)

  const handleLogout = async () => {
    dispatch(logout())
    dispatch(createNotification('You logged out', 'success', 3))
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      {user.username} logged in
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default App
