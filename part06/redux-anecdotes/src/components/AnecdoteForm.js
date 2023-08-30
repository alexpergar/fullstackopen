import { useDispatch } from 'react-redux'
import { setNotification, removeNotification, createNotification } from "../reducers/notificationReducer"
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const submitNewAnecdote = async (event) => {
    console.log(event);
    event.preventDefault()

    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
    dispatch(createNotification(`you created the anecdote '${content}'`))
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