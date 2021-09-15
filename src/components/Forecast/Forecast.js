import './Forecast.css';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

function Forecast({ data }) {
  return (
    <div className="forecast">
      <p className="forecastWeekday">{getWeekday(data.time)}</p>
      <div className="forecastIcon">
        <WeatherIcon id={data.weatherId}/>
      </div>
      <div className="temps">
        <p className="max-temp">{Number(data.maxTemp).toFixed(0)}<span>°C</span></p>
        <p className="min-temp">{Number(data.minTemp).toFixed(0)}<span>°C</span></p>
      </div>
    </div>
  )
}

/*
  Gets the short weekday format
  for a given time
*/
function getWeekday(time) {
  var date = new Date(time * 1000);
  return date.toLocaleString('de-DE', {weekday: 'short'});
}

export default Forecast
