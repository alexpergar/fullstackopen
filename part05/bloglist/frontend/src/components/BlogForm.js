import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlogInternal = async (event) => {
    event.preventDefault()
    createBlog(title, author, url, 0)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={createBlogInternal}>
      <div>
        title: <input
          type='text'
          value={title}
          name='Title'
          placeholder='Blog title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author: <input
          type='text'
          value={author}
          name='Author'
          placeholder='Blog author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url: <input
          type='text'
          value={url}
          name='Url'
          placeholder='Blog URL'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm