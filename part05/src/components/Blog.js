import { useState } from 'react'
import '../styles/index.css'

const Blog = ({ blog, likeBlog, deleteBlog }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : 'inline' }
  const showWhenVisible = { display: visible ? 'inline' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  let addedby = ''
  if (blog.user) {
    addedby = blog.user.name
  } else {
    addedby = 'Unknown'
  }

  return (
    <div className='blog'>
      <span>{blog.title} - {blog.author}</span>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        <p>{blog.likes}<button onClick={() => likeBlog(blog)}>like</button></p>
        <p>{addedby}</p>
        <button onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog