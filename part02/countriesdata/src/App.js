
import { useEffect, useState } from 'react'
import axios from 'axios'

import Countries from './Countries'


const App = () => {
  const [everyCountry, setEveryCountry] = useState([])
  const [countryName, setCountryName] = useState('')
  const [foundCountries, setFoundCountries] = useState([])

  // Fetch all countries' data to memory at start
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryArray = Object.entries(response.data).map(country => country[1])
        setEveryCountry(countryArray)
        setFoundCountries(countryArray)
      })
  }, [])

  // Update found contries when user inputs text
  useEffect(() => {
    setFoundCountries(everyCountry
      .filter(country =>  country.name.common.toUpperCase().indexOf(countryName.toUpperCase()) !== -1)
    )
  }, [countryName])

  
  return (
    <div>
      <div>
        Find countries: <input value={countryName} onChange={(event) => setCountryName(event.target.value)}/>
      </div>
      <Countries foundCountries={foundCountries} setFoundCountries={setFoundCountries}/>
    </div>
  )
}


export default App