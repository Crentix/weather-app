import React from 'react'
import Forecast from '../Forecast/Forecast';
import './WeatherDetails.css';

function WeatherDetails({ isDarkMode, data, forecast }) {

  /* DarkMode styles */
  const detailStyle = {
    backgroundColor: `${ isDarkMode ? 'var(--card-background-dark)' : 'var(--card-background-light)'}`
  }

  /* Icon style */
  const dirStyle = {
    transform: `rotate(${data.windDir}deg)`
  }

  return (
    <div>
      <div className="today">
        <h3>Heute</h3>
        <div className="details">
          <div>
            <div className="detail min-max" style={detailStyle}>
              <p>Höchst- & Tiefstwerte</p>
              <div>
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" stroke="#023e8a"></path>
                  </svg>
                  <p>{Number(data.minTemp).toFixed(1)}<span>°C</span></p>
                </div>
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" stroke="#f25c54"></path>
                  </svg>
                  <p>{Number(data.maxTemp).toFixed(1)}<span>°C</span></p>
                </div>
              </div>
            </div>
            <div className="detail sunrise-sunset" style={detailStyle}>
              <p>Sonnenaufgang & Sonnenuntergang</p>
              <div>
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M17 18a5 5 0 0 0-10 0" stroke="#ffdd00"></path>
                    <line x1="12" y1="2" x2="12" y2="9"></line>
                    <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" stroke="#ffdd00"></line>
                    <line x1="1" y1="18" x2="3" y2="18" stroke="#ffdd00"></line>
                    <line x1="21" y1="18" x2="23" y2="18" stroke="#ffdd00"></line>
                    <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" stroke="#ffdd00"></line>
                    <line x1="23" y1="22" x2="1" y2="22"></line>
                    <polyline points="8 6 12 2 16 6"></polyline>
                  </svg>
                  <p>{getTime(data.sunrise)}</p>
                </div>
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M17 18a5 5 0 0 0-10 0" stroke="#ffdd00"></path>
                    <line x1="12" y1="9" x2="12" y2="2"></line>
                    <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" stroke="#ffdd00"></line>
                    <line x1="1" y1="18" x2="3" y2="18" stroke="#ffdd00"></line>
                    <line x1="21" y1="18" x2="23" y2="18" stroke="#ffdd00"></line>
                    <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" stroke="#ffdd00"></line>
                    <line x1="23" y1="22" x2="1" y2="22"></line>
                    <polyline points="16 5 12 9 8 5"></polyline>
                  </svg>
                  <p>{getTime(data.sunset)}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="detail wind" style={detailStyle}>
              <p>Wind</p>
              <div>
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
                  </svg>
                  <p>{Number(Number(data.windSpeed * 3.6).toFixed(1))}<span>km/h</span></p>
                </div>
                <div>
                  <svg width="24" height="24" viewBox="0 0 24 24" style={dirStyle}>
                    <polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>
                  </svg>
                  <p>{getDirection(data.windDir)}</p>
                </div>
              </div>
            </div>
            <div className="detail humidity" style={detailStyle}>
              <p>Luftfeuchtigkeit</p>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="#00b4d8"></path>
                </svg>
                <p>{data.humidity}<span>%</span></p>
              </div>
            </div>
            <div className="detail rain" style={detailStyle}>
              <p>Regenmenge (1 Std.)</p>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <line x1="16" y1="13" x2="16" y2="21"></line>
                  <line x1="8" y1="13" x2="8" y2="21"></line>
                  <line x1="12" y1="15" x2="12" y2="23"></line>
                  <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
                </svg>
                <p>{data.rainVolumen}<span>mm</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3>Woche</h3>
        <ul>
          {forecast.data ? 
            forecast.data.map((day, index) => {
              return <Forecast data={day} key={index}></Forecast>
            }) :
            <></>
          }
        </ul>
      </div>
    </div>
  )
}

/*
  Gets the short direction
  for a given degree
*/
function getDirection(angle) {
   var directions = ["N", "NO", "O", "SO", "S", "SW", "W", "NW"]
   var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
   return directions[index]
}

/*
  Gets the 24h time format
  for a given time in seconds
*/
function getTime(time) {
  var date = new Date(time * 1000);
  return date.toLocaleString('de-DE', {hourCycle: 'h23', hour: '2-digit', minute: '2-digit'})
}

export default WeatherDetails
