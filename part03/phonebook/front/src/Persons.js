
import personService from './services/PersonsService'


const Persons = ({persons, setPersons, filter}) => {

  const personsToShow = persons.filter( person =>
    person.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1 
  )

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(person.id)
      .then(setPersons(persons.filter(p => p.id !== person.id)))
    }
  }
  
  return (
    <div>
      {personsToShow.map(person =>
        <p key={person.name}>{person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </p>
      )}
    </div>
  )
}

export default Persons