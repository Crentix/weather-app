import './WeatherHighlights.css';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import useWindowDimensions from '../../util/windowHelper';

function WeatherHighlights({ isDarkMode, data }) {
  
  const { height, width } = useWindowDimensions();

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
      {width > 480 ?
        <div className="general">
            <div className="skyline" style={skylineStyle}>
              <p className="location">{data.city}, {data.country}</p>
              <a href="https://www.freepik.com/vectors/background" style={{display: 'none'}}>Background vector created by rawpixel.com - www.freepik.com</a>
            </div> 
          <div className="time">
            <p className="weekday">{getWeekday(data.timezone)}</p>
            <p className="timestamp">{getTime(data.timezone)}</p>
          </div> 
        </div> : 
        <div className="general">
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p className="location">{data.city}, {data.country}</p>
          </div>
          <div className="time">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <p className="weekday">{getWeekday(data.timezone)}</p>
            <p className="timestamp">{getTime(data.timezone)}</p>
          </div> 
        </div>
      }
      <div className="stats">
        <div className="icon">
          <WeatherIcon id={data.weatherId}/>
        </div>
        <div className="main">
          <p className="temp">{data.temp}°C</p>
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" style={iconStyle}>
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
            </svg>
            <p>{data.desc}</p>
          </div>
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
