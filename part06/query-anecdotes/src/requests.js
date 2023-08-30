import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (newAnecdote) => {
  if (newAnecdote.content.length < 5) {
    // Simulated anecdote length restriction (json-server is not
    // restricting the length)
    throw new Error('Anecdote must be at least 5 characters long')
  }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

export const voteAnecdote = async (anecdote) => {
  const url = `${baseUrl}/${anecdote.id}`
  const votedAnecdote = {...anecdote, votes: anecdote.votes+1}
  const response = await axios.put(url, votedAnecdote)
  return response.data
}