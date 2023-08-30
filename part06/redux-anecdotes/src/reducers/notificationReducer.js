import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const createNotification = (content) => {
  return async dispatch => {
    dispatch(setNotification(`you created the anecdote '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
  }
}

export default notificationSlice.reducer