import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationSet(state, action) {
      return action.payload
    },
    notificationRemove(state, action) {
      return ''
    }
  }
})

export const { notificationSet, notificationRemove } = notificationSlice.actions

export const createNotification = (content, displayTime) => {
  return async dispatch => {
    dispatch(notificationSet(`you created the anecdote '${content}'`))
    setTimeout(() => {
      dispatch(notificationRemove())
    }, displayTime * 1000);
  }
}

export default notificationSlice.reducer