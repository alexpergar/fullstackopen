
import { useEffect, useState } from 'react'
import axios from 'axios'

import Countries from './Countries'


const App = () => {
  const [everyCountry, setEveryCountry] = useState([])
  const [countryName, setCountryName] = useState('')
  const [foundCountries, setFoundCountries] = useState([])

  // Fetch all countries data to memory
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setEveryCountry(Object.entries(response.data)))
  }, [])

  // Update found contries when loading the database or when user input
  useEffect(() => {
    setFoundCountries(everyCountry
      .filter(country =>  country[1].name.common.toUpperCase().indexOf(countryName.toUpperCase()) !== -1)
      .map( country => country[1])
    )
  }, [countryName, everyCountry])

  return (
    <div>
      <div>
        find countries <input value={countryName} onChange={(event) => setCountryName(event.target.value)}/>
      </div>
      <Countries foundCountries={foundCountries}/>
    </div>
  )
}


export default App