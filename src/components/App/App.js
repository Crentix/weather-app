import './App.css';
import { useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import WeatherInfo from '../WeatherInfo/WeatherInfo';

function App() {

  const [city, setCity] = useState('Berlin');
  const [isDarkMode, setDarkMode] = useState(true);
  const [isError, setError] = useState(false);
  
  /* DarkMode styles */
  const style = {
    backgroundColor: `${ isDarkMode ? 'var(--background-dark)' : 'var(--background-light)' }`,
    color: `${ isDarkMode ? 'var(--white)' : 'var(--black)' }`, 
  }

  return (
    <div className="App" style={style}>
      <DarkModeToggle isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
      <Searchbar isDarkMode={isDarkMode} enter={(query) => setCity(query)} isError={isError} setError={setError}></Searchbar>
      <WeatherInfo isDarkMode={isDarkMode} city={city} setError={setError}></WeatherInfo>
    </div>
  );
}

export default App;
