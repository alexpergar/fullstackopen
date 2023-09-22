import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getCachedUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UsersPage from './components/UsersPage'
import BlogsPage from './components/BlogsPage'
import User from './components/User'
import BlogItem from './components/Blog'
import NavMenu from './components/NavMenu'
import { PageBody } from './styled/App.styles'
import GlobalStyle from './styled/globalStyles'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCachedUser())
    dispatch(initializeBlogs())
  }, [])

  const loggedUser = useSelector((state) => state.user)

  if (loggedUser === null) {
    return (
      <PageBody>
        <Notification />
        <LoginForm />
      </PageBody>
    )
  }

  return (
    <div>
      <GlobalStyle />
      <Notification />
      <NavMenu />
      <PageBody>
        <Routes>
          <Route path='/' element={<Navigate replace to='/blogs' />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/blogs' element={<BlogsPage />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/blogs/:id' element={<BlogItem />} />
        </Routes>
      </PageBody>
    </div>
  )
}

export default App
