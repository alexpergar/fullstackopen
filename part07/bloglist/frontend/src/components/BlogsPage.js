import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const BlogsPage = () => {
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
