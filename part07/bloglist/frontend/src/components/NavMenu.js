import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { logout } from '../reducers/userReducer'
import { StyledLink } from '../styled/common.styles'
import { NavBar, NavElement } from '../styled/NavMenu.styles'

const NavMenu = () => {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logout())
    dispatch(createNotification('You logged out', 'success', 3))
  }

  const loggedUser = useSelector((state) => state.user)

  return (
    <NavBar>
      <NavElement>
        <StyledLink to='/blogs'>Blogs</StyledLink>
      </NavElement>
      <NavElement>
        <StyledLink to='/users'>Users</StyledLink>
      </NavElement>
      <NavElement>
        Welcome, <b>{loggedUser.name}</b>
      </NavElement>
      <NavElement>
        <button onClick={handleLogout}>logout</button>
      </NavElement>
    </NavBar>
  )
}

export default NavMenu
