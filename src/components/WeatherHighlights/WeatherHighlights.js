import './WeatherHighlights.css';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

function WeatherHighlights({ isDarkMode, data }) {

  /* DarkMode styles */
  const skylineStyle = {
    backgroundColor: `${ isDarkMode ? 'var(--card-background-dark)' : 'var(--card-background-light)' }`,
    backgroundImage: `url(./img/skyline.png)`,
  }

  const iconStyle = {
    stroke: `${ isDarkMode ? 'var(--white)' : 'var(--black)' }`,
  }

  return (
    <div className="highlights">
      <div className="skyline" style={skylineStyle}>
        <p className="location">{data.city}, {data.country}</p>
        <a href="https://www.freepik.com/vectors/background" style={{display: 'none'}}>Background vector created by rawpixel.com - www.freepik.com</a>
      </div>
      <div className="time">
        <p className="weekday">{getWeekday(data.timezone)}</p>
        <p className="timestamp">{getTime(data.timezone)}</p>
      </div>
      <div className="stats">
        <WeatherIcon id={data.weatherId} className="icon"/>
        <p className="temp">{data.temp}°C</p>
        <div>
          <svg width="24" height="24" viewBox="0 0 24 24" style={iconStyle}>
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
          </svg>
          <p>{data.desc}</p>
        </div>
      </div>
    </div>
  )
}

function calcDate(offset) {
  if (offset === undefined) {
    return new Date();
  }

  // create Date object for current location
  var d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

  // create new Date object
  // using supplied offset and return it
  return new Date(utc + (1000 * offset));
}

/*
  Gets the long weekday format
  based on a timezone offset
*/
function getWeekday(timezone) {
  var date = calcDate(timezone);
  return date.toLocaleString('de-DE', {weekday: 'long'});
}

/*
  Gets the 24h time format
  based on a timezone offset
*/
function getTime(timezone) {
  var date = calcDate(timezone);
  return date.toLocaleString('de-DE', {hourCycle: 'h23', hour: '2-digit', minute: '2-digit'})
}

export default WeatherHighlights
