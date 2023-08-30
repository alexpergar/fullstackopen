import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from './requests'
import { useNotifDispatch } from './Context'


const App = () => {
  const notifDispatch = useNotifDispatch()

  const queryClient = useQueryClient()
  const voteMutation = useMutation(voteAnecdote, {
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const anecdotesExceptVoted = anecdotes.filter(a => a.id !== votedAnecdote.id)
      queryClient.setQueryData(['anecdotes'], anecdotesExceptVoted.concat(votedAnecdote))
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
    notifDispatch({ type: 'SET_MESSAGE',
                    payload: `You voted: "${anecdote.content}"`})
    setTimeout(() => notifDispatch({ type: 'CLEAR_MESSAGE' }), 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  else if (result.isError) {
    return <div>Anecdote service not available due to problems in the server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
