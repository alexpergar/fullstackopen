import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotesService"


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    anecdoteVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const anecdoteChanged = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes+1
      }
      return state
        .map(anecdote =>
          anecdote.id === id ? anecdoteChanged : anecdote
        )
    },
    anecdoteAdd(state, action) {
      state.push(action.payload)
    },
    anecdotesSet(state, action) {
      return action.payload
    }
  }
})

export const { anecdoteVote, anecdoteAdd, anecdotesSet } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(anecdotesSet(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(anecdoteAdd(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdotesService.addVote(anecdote)
    dispatch(anecdoteVote(votedAnecdote.id))
  }
}

export default anecdoteSlice.reducer