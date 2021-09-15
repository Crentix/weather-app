import './WeatherIcon.css';

function WeatherIcon({ id, width, height }) {

  const style = (width & height) ? {
    width: `${width}px`,
    height: `${height}px`
  } : {
    width: `100%`,
    height: `100%`
  }

  return (
    <img src={getWeatherIcon(id)} alt="weather icon" style={style}/>
  )
}


/*
    See https://openweathermap.org/weather-conditions
    Group 2xx: Thunderstorm
      -> cloud_rain_lightning.svg
    Group 3xx: Drizzle
    Group 5xx: Rain
    Group 6xx: Snow
      -> sun_cloud_rain.svg || moon_cloud_rain.svg
    Group 7xx: Atmosphere
    Group 800: Clear
    Group 80x: Clouds
      -> sun_wind.svg || moon.svg
    Group 800: Clear
      -> moon.svg
*/
function getWeatherIcon(id) {
  
  let leading_number = Number(`${id}`[0]);

  switch (leading_number) {
    case 2:
      return "./img/cloud_rain_lightning.svg"
    case 3:
    case 5:
    case 6:
      return "./img/sun_cloud_rain.svg";
    case 7:
    case 8:
      return "./img/sun_wind.svg";
    default:
      return "./img/sun_cloud_rain.svg";
  }

}

export default WeatherIcon
