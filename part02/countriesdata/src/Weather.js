
import axios from 'axios'
import { useEffect, useState } from 'react'


const Weather = ({country}) => {

    const [weatherResponse, setWeatherResponse] = useState(null)
    const [lastCountryName, setLastCountryName] = useState('')


    const requestWeather = (country) => {
        if (lastCountryName === country.name.common) return weatherResponse
        const [lat, lng] = country.capitalInfo.latlng
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_API_KEY}`)
          .then(response => {
            setWeatherResponse(response.data)
        })
        setWeatherResponse(null)
        setLastCountryName(country.name.common)
    }

    requestWeather(country)
    if (weatherResponse) {
        return (
            <div>
                <h2>Weather in {country.capital[0]}</h2>
                <p>Temperature: {Math.round((weatherResponse.main.temp - 273) * 100)/100} ºC</p> 
                <img src={`https://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}@2x.png`}></img>
                <p>Wind: {weatherResponse.wind.speed} m/s</p>
            </div>
        )
    }
}


export default Weather