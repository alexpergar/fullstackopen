
import { useEffect, useState } from 'react'

import Weather from './Weather'


const Countries = ({foundCountries, setFoundCountries}) => {

    const flagStyle = {fontSize:150, marginTop:-15, marginBottom:-10}

    if (foundCountries.length === 1) {
        const onlyCountry = foundCountries[0]

        return (
            <div>
                <h2>Result</h2>
                <div key={onlyCountry.name.common}>
                    <h2>{onlyCountry.name.common}</h2>
                    <p>Capital: {onlyCountry.capital[0]}</p>
                    <p>Area: {onlyCountry.area}</p>
                    <br/>
                    <b>Languages:</b>
                    <ul>
                        {Object.entries(onlyCountry.languages).map(lang => 
                            <li key={lang[1]}>{lang[1]}</li>
                        )}
                    </ul>
                    <p style={flagStyle}>{onlyCountry.flag}</p>
                    
                    <Weather country={onlyCountry}/>
                </div>
          </div>
        )
    } else {
        // Return a list of countries if more than 1
        return (
            <div>
                <h2>Results</h2>
                {foundCountries.map( (country, index) => 
                <p key={country.name.common}>{country.name.common}
                    <button onClick={() => setFoundCountries([foundCountries[index]])}>Show</button>
                </p>
                )}
          </div>
        )
    }
}


export default Countries