import { useEffect, useState } from 'react'
import axios from 'axios'

import Form from './Form'
import Filter from './Filter'
import Persons from './Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Load data from json "db"
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>

      <h2>Add new</h2>
      <Form persons={persons} setPersons={setPersons}
            newName={newName} setNewName={setNewName}
            newNumber={newNumber} setNewNumber={setNewNumber}/>


      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}


export default App