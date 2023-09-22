import { useEffect, useState } from 'react'
import userService from '../services/users'
import { StyledLink } from '../styled/common.styles'

const UsersPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((result) => setUsers(result))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            return (
              <tr key={u.id}>
                <td>
                  <StyledLink to={`/users/${u.id}`}>
                    <b>{u.name}</b>
                  </StyledLink>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage
