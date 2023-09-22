import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { VPadDiv } from '../styled/BlogForm.styles'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const user = useSelector((state) => state.user)

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
      likes: 0,
      user: user,
    }
    dispatch(createBlog(newBlog))
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <h2>New blog</h2>
      <VPadDiv>
        Title:{' '}
        <input
          id='title-input'
          type='text'
          value={title}
          name='Title'
          placeholder='Blog title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </VPadDiv>
      <VPadDiv>
        Author:{' '}
        <input
          id='author-input'
          type='text'
          value={author}
          name='Author'
          placeholder='Blog author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </VPadDiv>
      <VPadDiv>
        URL:{' '}
        <input
          id='url-input'
          type='text'
          value={url}
          name='Url'
          placeholder='Blog URL'
          onChange={({ target }) => setUrl(target.value)}
        />
      </VPadDiv>
      <button id='blog-button' type='submit'>
        Create
      </button>
    </form>
  )
}

export default BlogForm
