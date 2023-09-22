import { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import userService from '../services/users'
import { StyledLink } from '../styled/common.styles'

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
    return (
      <div>
        <StyledLink to='/users'>go back</StyledLink>
        <p>Loading...</p>
      </div>
    )
  } else if (user.notFound) {
    return (
      <div>
        <StyledLink to='/users'>go back</StyledLink>
        <h2>User not found</h2>
      </div>
    )
  } else {
    return (
      <div>
        <StyledLink to='/users'>Go back</StyledLink>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.map((blog) => {
            return (
              <li key={blog.id}>
                <StyledLink to={`/blogs/${blog.id}`}>
                  <b>{blog.title}</b>
                </StyledLink>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default User
