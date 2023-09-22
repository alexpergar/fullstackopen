import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const likeBlog = async (blog) => {
  const url = `${baseUrl}/${blog.id}`
  const config = {
    headers: { Authorization: token },
  }

  blog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
  const response = await axios.put(url, blog, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const url = `${baseUrl}/${blog.id}`
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(url, config)
}

export default {
  getAll,
  getById,
  createBlog,
  likeBlog,
  setToken,
  deleteBlog,
}
