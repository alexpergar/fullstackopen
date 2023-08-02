import { useState } from 'react'
import blogService from '../services/blogs'
import '../styles/index.css'

const Blog = ({blog, blogs, setBlogs, notify}) => {

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

  const likeBlog = async () => {
    try {
      console.log(blog)
      const likedBlog = await blogService.likeBlog(blog)
      let modBlogs = blogs.map(b => b.id === blog.id ? likedBlog : b)
      modBlogs.sort((a, b) => {
        if (a.likes > b.likes) return -1
        else return 1
      })
      console.log(likedBlog)
      setBlogs(modBlogs)
    } catch(exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  const deleteBlog = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      return
    }
    try {
      blogService.deleteBlog(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
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
        <p>{blog.likes}<button onClick={likeBlog}>like</button></p>
        <p>{addedby}</p>
        <button onClick={deleteBlog}>remove</button>
      </div>
    </div>  
  )
}

export default Blog