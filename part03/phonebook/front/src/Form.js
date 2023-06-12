
import personService from './services/PersonsService'


const Form = (props) => {

  const { persons, setPersons, newName,
          setNewName, newNumber, setNewNumber, 
          setNotification, setNotificationClass } = props

  const notify = (message, style) => {
    setNotification(message)
    setNotificationClass(style)
    setTimeout(() => setNotification(null), 3000)
  }

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
          .then(result => {
            setPersons(persons.map(p => p.id === changedPerson.id ? changedPerson : p))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            notify(error.response.data.error, 'error')
            // setPersons(persons.filter(p => p.name !== changedPerson.name)) 
          })
      }
      return
    }
    
    // Create new person if it didn't exist
    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        notify(`Added ${newPerson.name}`, 'success')
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        notify(error.response.data.error, 'error')
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