import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"


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

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdoteVoted = anecdotesSorted.filter(a => a.id === id).pop()
    dispatch(setNotification(`you voted '${anecdoteVoted.content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
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
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList