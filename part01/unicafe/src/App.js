import { useState } from 'react'


const Button = ({text, handleClick}) => {

  return (
    <button onClick={() => handleClick()}>{text}</button>
  )
}

const StatisticsLine = ({text, value}) => {

return (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)
}

const Statistics = ({good, neutral, bad}) => {

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  // Calculate some statistics
  const all      = good + neutral + bad
  const average  = (good - bad) / all
  const positive = good / all * 100 + " %"

  return (
    <div>
      <h2>statistics</h2>
      <StatisticsLine text="good"     value={good}/>
      <StatisticsLine text="neutral"  value={neutral}/>
      <StatisticsLine text="bad"      value={bad}/>
      <StatisticsLine text="all"      value={all}/>
      <StatisticsLine text="average"  value={average}/>
      <StatisticsLine text="positive" value={positive}/>
    </div>
  )

}

const App = () => {

  const [good, setGood]       = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad]         = useState(0)

  const setter = (setter, counter) => setter(counter + 1)

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good"    handleClick={() => setter(setGood, good)}/>
      <Button text="neutral" handleClick={() => setter(setNeutral, neutral)}/>
      <Button text="bad"     handleClick={() => setter(setBad, bad)}/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App