import { useSelector } from 'react-redux'
import { sortedBlogsSelector } from '../utils/sorter'
import { StyledLink } from '../styled/common.styles'

const BlogList = () => {
  const blogs = useSelector(sortedBlogsSelector)

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <StyledLink to={`/blogs/${blog.id}`}>
                <b>{blog.title}</b> by <i>{blog.author}</i>
              </StyledLink>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BlogList
