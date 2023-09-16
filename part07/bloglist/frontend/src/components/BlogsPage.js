import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'

const BlogsPage = () => {
  const dispatch = useDispatch()
  dispatch(initializeBlogs())

  return (
    <div>
      <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default BlogsPage
