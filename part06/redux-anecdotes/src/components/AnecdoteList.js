import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.filter === ''
      ? state.anecdotes
      : state.anecdotes.filter(a => a.content.includes(state.filter))
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdoteVoted = anecdotes.filter(a => a.id === id).pop()
    dispatch(setNotification(`you voted '${anecdoteVoted.content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
  }

  return (
    <div>
    {anecdotes.map(anecdote =>
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