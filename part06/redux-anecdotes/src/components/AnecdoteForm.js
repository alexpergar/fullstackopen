import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import anecdotesService from '../services/anecdotesService'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    const newAnecdote = await anecdotesService.createNew(content)
    console.log(newAnecdote);
    dispatch(addAnecdote(newAnecdote))
    event.target.anecdote.value = ''
    dispatch(setNotification(`you created the anecdote '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name='anecdote'/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
    )
}

export default AnecdoteForm