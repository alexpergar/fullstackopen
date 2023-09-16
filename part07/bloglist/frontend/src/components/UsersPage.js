import { useEffect, useState } from 'react'
import userService from '../services/users'

const UsersPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((result) => setUsers(result))
    console.log(users)
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
                <td>{u.name}</td>
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
