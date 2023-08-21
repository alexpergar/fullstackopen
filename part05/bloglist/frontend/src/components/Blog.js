import { useState } from 'react'
import '../styles/index.css'

const Blog = ({ blog, likeBlog, deleteBlog, isOwner }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : 'inline' }
  const showWhenVisible = { display: visible ? 'inline' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // In case no author is known
  // if (blog.user.name === undefined) {
  //   blog.user.name = 'Unknown'
  // }

  const removeButton = isOwner
    ? (<button onClick={() => deleteBlog(blog)}>remove</button>)
    : null

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
        <p>{blog.user.name}</p>
        {removeButton}
      </div>
    </div>
  )
}

export default Blog