import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', style: '' },
  reducers: {
    notificationSet(state, action) {
      return {
        message: action.payload.message,
        style: action.payload.style,
      }
    },
    notificationRemove(state, action) {
      return { message: '', style: '' }
    },
  },
})

export const { notificationSet, notificationRemove } = notificationSlice.actions

export const createNotification = (message, style, displayTime) => {
  return async (dispatch) => {
    dispatch(
      notificationSet({
        message: message,
        style: style,
      })
    )
    setTimeout(() => {
      dispatch(notificationRemove())
    }, displayTime * 1000)
  }
}

export default notificationSlice.reducer
