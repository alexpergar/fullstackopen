import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notificationSet, notificationRemove, createNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {
  const dispatch = useDispatch()

  const sortByVotes = (a, b) => {
    if (a.votes > b.votes) return -1
    else if (a.votes < b.votes) return 1
    else return a.content.localeCompare(b.content) // Sort alphabetically.
  }
  
  const anecdotes = useSelector(state =>
    state.filter === ''
      ? state.anecdotes
      : state.anecdotes.filter(a => a.content.includes(state.filter))
  )
  const anecdotesSorted = [ ...anecdotes ].sort(sortByVotes)

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(createNotification(`you voted '${anecdote.content}'`))
  }

  return (
    <div>
    {anecdotesSorted.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList