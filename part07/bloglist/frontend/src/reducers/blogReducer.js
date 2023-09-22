import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    blogSet(state, action) {
      return action.payload
    },
    blogAdd(state, action) {
      state.push(action.payload)
    },
    blogLike(state, action) {
      const id = action.payload.id
      const targetBlog = state.find((b) => b.id === id)
      const likedBlog = { ...targetBlog, likes: targetBlog.likes + 1 }
      return state.map((blog) => (blog.id === id ? likedBlog : blog))
    },
    blogRemove(state, action) {
      const id = action.payload.id
      return state.filter((blog) => blog.id !== id)
    },
    blogComment(state, action) {
      const comment = action.payload
      const id = comment.blog.id
      const targetBlog = state.find((b) => b.id === id)
      const commentedBlog = {
        ...targetBlog,
        comments: targetBlog.comments.concat(comment),
      }
      return state.map((blog) => (blog.id === id ? commentedBlog : blog))
    },
  },
})

export const { blogSet, blogAdd, blogLike, blogRemove, blogComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(blogSet(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.createBlog(newBlog)
      dispatch(blogAdd(createdBlog))
      dispatch(
        createNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} was added`,
          'success',
          3
        )
      )
    } catch (error) {
      dispatch(createNotification(error.response.data.error, 'error', 3))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.likeBlog(blog)
    dispatch(blogLike(likedBlog))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog)
    dispatch(blogRemove(blog))
  }
}

export const commentBlog = (blog, commentContent) => {
  return async (dispatch) => {
    const comment = { content: commentContent }
    const resultComment = await blogService.commentBlog(blog, comment)
    dispatch(blogComment(resultComment))
    dispatch(createNotification('comment posted', 'success', 3))
  }
}

export default blogSlice.reducer
