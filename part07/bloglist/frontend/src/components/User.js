import { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import userService from '../services/users'

const User = () => {
  const [user, setUser] = useState(null)
  const userMatch = useMatch('/users/:id')

  useEffect(() => {
    userService
      .getById(userMatch.params.id)
      .then((result) => setUser(result))
      .catch((error) => setUser({ notFound: true }))
  }, [])

  if (!user) {
    return <div>Loading...</div>
  } else if (user.notFound) {
    return <div>User not found</div>
  } else {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default User
