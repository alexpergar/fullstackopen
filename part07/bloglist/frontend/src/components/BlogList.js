import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import { sortedBlogsSelector } from '../utils/sorter'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(sortedBlogsSelector)
  const user = useSelector((state) => state.user)

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))
    } catch (exception) {
      dispatch(createNotification(exception.response.data.error, 'error', 3))
    }
  }

  const handleRemove = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return
    }
    try {
      dispatch(removeBlog(blog))
      dispatch(
        createNotification(
          `the blog ${blog.title} by ${blog.author} was deleted`,
          'success',
          3
        )
      )
    } catch (exception) {
      dispatch(createNotification(exception.response.data.error, 'error', 3))
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => {
        const isOwner = blog.user.username === user.username
        return (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={handleLike}
            deleteBlog={handleRemove}
            isOwner={isOwner}
          />
        )
      })}
    </div>
  )
}

export default BlogList
