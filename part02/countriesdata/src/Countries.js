
import { useEffect, useState } from 'react'


const Countries = ({foundCountries}) => {

    if (foundCountries.length === 1) {
        return (
            <div>
                results
                <p>{foundCountries[0].name.official}</p>
          </div>
        )
    } else {
        return (
            <div>
                results
                {foundCountries.map(country => 
                <p key={country.name.common}>{country.name.common}</p>
                )}
          </div>
        )
    }
}


export default Countries