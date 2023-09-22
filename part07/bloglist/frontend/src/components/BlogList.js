import { useSelector } from 'react-redux'
import { sortedBlogsSelector } from '../utils/sorter'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(sortedBlogsSelector)

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <b>{blog.title}</b> by {blog.author}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default BlogList
