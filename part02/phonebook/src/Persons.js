
const Persons = ({persons, filter}) => {

  const personsToShow = persons.filter( person =>
    person.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1 
  )
  
  return (
    <div>
      {personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default Persons