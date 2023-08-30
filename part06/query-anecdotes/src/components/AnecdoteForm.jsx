import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotifDispatch } from "../Context"

const AnecdoteForm = () => {
  const notifDispatch = useNotifDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (createdAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(createdAnecdote))
    },
    onError: (error) => {
      notifDispatch({ type: 'SET_MESSAGE', payload: `${error.toString()}`})
      setTimeout(() => notifDispatch({ type: 'CLEAR_MESSAGE' }), 5000)
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newAnecdote = {
      content: content,
      votes: 0,
      id: getId()
    }
    newAnecdoteMutation.mutate(newAnecdote)
    event.target.anecdote.value = ''
    notifDispatch({ type: 'SET_MESSAGE',
                    payload: `You created: "${newAnecdote.content}"`})
    setTimeout(() => notifDispatch({ type: 'CLEAR_MESSAGE' }), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
