
import personService from './services/PersonsService'


const Form = (props) => {

  const {persons, setPersons, newName,
          setNewName, newNumber, setNewNumber} = props

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim()
    }
    
    // Check if person already exists
    const personFound = persons.find(p => p.name === newPerson.name)
    if (personFound) {
      if (window.confirm(`${personFound.name} is already added to phonebook. Replace the old number with a new one?`)) {
        const changedPerson = {...personFound, number: newPerson.number}
        personService
          .modify(changedPerson.id, changedPerson)
          .then(setPersons(persons.map(p => p.id === changedPerson.id ? changedPerson : p)))
      }
      setNewName('')
      setNewNumber('')
      return
    }
    
    // Create new person if it didn't exist
    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form