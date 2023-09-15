import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    userSet(state, action) {
      return action.payload
    },
    userRemove(state, action) {
      return null
    },
  },
})

export const { userSet, userRemove } = userSlice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(userSet(user))
      dispatch(createNotification('You logged in', 'success', 3))
    } catch (error) {
      dispatch(createNotification(error.response.data.error, 'error', 3))
      return error
    }
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
