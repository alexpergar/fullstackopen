import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({blogs, setBlogs, notify}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()
  
    const likes = 0
    try {
      const newBlog = await blogService.createBlog({
        title, author, url, likes
      })
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      notify(`a new blog ${newBlog.title} by ${newBlog.author} was added`, 'success')
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  return (
  <form onSubmit={createBlog}>
    <div>
      title: <input
        type='text'
        value={title}
        name='Title'
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author: <input
        type='text'
        value={author}
        name='Author'
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url: <input
        type='text'
        value={url}
        name='Url'
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type='submit'>create</button>
  </form>
  )
}
  
export default BlogForm