import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const BlogsPage = () => {
  return (
    <div>
      <BlogList />
      <Togglable buttonLabel='Click here to create a new blog'>
        <BlogForm />
      </Togglable>
    </div>
  )
}

export default BlogsPage
