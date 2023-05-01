import { useState } from 'react'


const MostVoted = ({anecdotes, mostVotedId}) => {

    if (mostVotedId === -1) {
      return (
        <div>
          <h2>Anecdote with most botes</h2>
          <p>No votes yet.</p>
        </div>
      )
    }

    return (
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[mostVotedId]}</p>
      </div>
    )

}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected]     = useState(-1)
  const [votes, setVotes]           = useState(new Uint8Array(anecdotes.length))
  const [mostVotedId, setMostVoted] = useState(-1)

  const getRandomInt = () => {
    let newSelected = selected
    // Repeat until a non-repeated number is generated
    while (newSelected === selected) {
      newSelected = Math.floor(Math.random() * anecdotes.length)
    }
    return newSelected
  }

  const addVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)

    // If it's the new most voted, set it as most voted
    if (votesCopy[selected] > Math.max(...votes)) {
      setMostVoted(selected)
    }
  }

  // Set the first anecdote at random
  if (selected === -1)  setSelected(getRandomInt)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => addVote()}>vote</button>
      <button onClick={() => setSelected(getRandomInt())}>next anectote</button>

      <br/>
      <MostVoted anecdotes={anecdotes} mostVotedId={mostVotedId}/>
    </div>
  )
}

export default App