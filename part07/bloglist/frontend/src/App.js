import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import { createNotification } from './reducers/notificationReducer'
import { getCachedUser, logout } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import UsersPage from './components/UsersPage'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import BlogsPage from './components/BlogsPage'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCachedUser())
  }, [])

  const loggedUser = useSelector((state) => state.user)

  const handleLogout = async () => {
    dispatch(logout())
    dispatch(createNotification('You logged out', 'success', 3))
  }

  if (loggedUser === null) {
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
      {loggedUser.username} logged in
      <button onClick={handleLogout}>logout</button>
      <Routes>
        <Route path='/users' element={<UsersPage />} />
        <Route path='/blogs' element={<BlogsPage />} />
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </div>
  )
}

export default App
