
import { useEffect, useState } from 'react'

import Form from './Form'
import Filter from './Filter'
import Persons from './Persons'
import personService from './services/PersonsService'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Load data from json "db"
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
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
      <Persons persons={persons} setPersons={setPersons} filter={filter}/>
    </div>
  )
}


export default App