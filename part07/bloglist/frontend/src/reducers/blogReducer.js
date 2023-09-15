import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
  },
})

export const { blogSet, blogAdd, blogLike, blogRemove } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(blogSet(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.createBlog(newBlog)
    dispatch(blogAdd(createdBlog))
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

export default blogSlice.reducer
