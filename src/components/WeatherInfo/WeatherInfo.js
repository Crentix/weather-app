import React, { useEffect, useState } from 'react'
import './WeatherInfo.css';
import WeatherHighlights from '../WeatherHighlights/WeatherHighlights';
import WeatherDetails from '../WeatherDetails/WeatherDetails';

const api_url = `https://api.openweathermap.org/data/2.5`;

function WeatherInfo({ isDarkMode, city, setError }) {

  const [weatherData, setWeatherData] = useState({});
  const [forecastData, setForecastData] = useState({});

  useEffect(() => {
    if (city) {
      fetchData(city).then((data) => {
        if (data) {
          setWeatherData(data);
          fetchForecastData(data.lat, data.lon).then((data) => {
            if (data) {
              setForecastData(data);
            }
          })
        }
      }).catch((err) => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      });
    }
  }, [city, setError]);

  return (
    <div className="weatherInfo">
      <div className="left">
        <WeatherHighlights isDarkMode={isDarkMode} data={weatherData}></WeatherHighlights>
      </div>
      <div className="right">
        <WeatherDetails isDarkMode={isDarkMode} data={weatherData} forecast={forecastData}></WeatherDetails>
      </div>
    </div>
  )
}

/*
  Fetches current weather data
  for a city
*/
async function fetchData(city) {
  return new Promise(async (resolve, reject) => {

    // Check if data is in localstorage
    var storedItem = localStorage.getItem(`city_${city}`);
    if (storedItem) {
      var iat = storedItem.iat;

      var currentTime = new Date().getTime();

      // if data is not older then 5min return it
      if (iat + 1000 * 60 * 5 > currentTime) {
        resolve(JSON.parse(storedItem));
        return;
      }

    }

    // fetch
    const res = await fetch(`${api_url}/weather?q=${city}&appid=${process.env.REACT_APP_OWM_APP_ID}&units=metric&lang=de`);
    res.json().then((data) => {
      if (data) {
        // extract relevant data
        let weatherData = {
          iat: new Date().getTime(),
          lat: data.coord.lat,
          lon: data.coord.lon,
          city,
          country: data.sys.country,
          timezone: data.timezone,
          weatherId: data.weather[0].id,
          temp: Math.round(data.main.temp),
          maxTemp: data.main.temp_max,
          minTemp: data.main.temp_min,
          humidity: data.main.humidity,
          desc: data.weather[0].description,
          rainVolumen: data.rain ? data.rain['1h'] : 0,
          windSpeed: data.wind ? data.wind.speed : 0,
          windDir: data.wind ? data.wind.deg : 0,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
        }
        
        // store to localstorage for caching
        localStorage.setItem(`city_${city}`, JSON.stringify(weatherData));
        resolve(weatherData);
      }
    }).catch((err) => {
      reject(err);
    });
  })
}

/*
  Fetches 7 days weather forecast
  for lat & lon
*/
async function fetchForecastData(lat, lon) {
  return new Promise(async (resolve, reject) => {

    // Check if data is in localstorage
    var storedItem = localStorage.getItem(`forecast_${lat}_${lon}`);
    if (storedItem) {
      var iat = storedItem.iat;

      var currentTime = new Date().getTime();

      // if data is not older then 1h return it
      if (iat + 1000 * 60 * 60 > currentTime) {
        resolve(JSON.parse(storedItem));
        return;
      }

    }

    // fetch
    const res = await fetch(`${api_url}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_OWM_APP_ID}&units=metric&lang=de`);
    res.json().then((data) => {
      if (data) {
        // extract next 7 days
        var forecastData = {
          iat: new Date().getTime(),
          data: data.daily.splice(1).map((day) => {
            return {
              time: day.dt,
              weatherId: day.weather[0].id,
              maxTemp: day.temp.max,
              minTemp: day.temp.min
            }
          })
        }
        
        // store to localstorage for caching
        localStorage.setItem(`forecast_${lat}_${lon}`, JSON.stringify(forecastData));
        resolve(forecastData);
      }
    }).catch((err) => {
      reject(err);
    });
  })
}

export default WeatherInfo
