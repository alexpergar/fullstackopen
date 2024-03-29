import { useDispatch } from 'react-redux'
import { createNotification } from "../reducers/notificationReducer"
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const submitNewAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
    dispatch(createNotification(`you created the anecdote '${content}'`, 3))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitNewAnecdote}>
        <div>
          <input name='anecdote'/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
    )
}

export default AnecdoteForm