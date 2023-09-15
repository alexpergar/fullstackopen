import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    userSet(state, payload) {
      return payload
    },
    userRemove(state, payload) {
      return null
    },
  },
})

export const { userSet, userRemove } = userSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    })
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(userSet(user))
    console.log(user)
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    dispatch(userRemove())
  }
}

export const getCachedUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON)
      dispatch(userSet(parsedUser))
      blogService.setToken(parsedUser.token)
    }
  }
}

export default userSlice.reducer
