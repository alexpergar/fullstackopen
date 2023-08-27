import { createSlice } from "@reduxjs/toolkit"


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortByVotes = (a, b) => {
  if (a.votes > b.votes) return -1
  else if (a.votes < b.votes) return 1
  else return a.content.localeCompare(b.content) // Sort alphabetically.
}

const initialState = anecdotesAtStart.map(asObject)
initialState.sort(sortByVotes)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const anecdoteChanged = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes+1
      }
      return state
        .map(anecdote =>
          anecdote.id === id ? anecdoteChanged : anecdote
        ).sort(sortByVotes)
    },
    addAnecdote(state, action) {
      const newAnecdote = asObject(action.payload)
      return [ ...state, newAnecdote ]
    }
  }
})


export const { voteAnecdote, addAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer