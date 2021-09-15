import { useEffect, useState } from 'react';
import './Searchbar.css';

function Searchbar({ isDarkMode, enter, isError, setError }) {

  const [query, setQuery] = useState('');

  useEffect(() => {
    setError(false);
  }, [query, setError]);

  /* DarkMode styles */
  const inputStyle = {
    color: `${ isDarkMode ? 'var(--white)' : 'var(--black)' }`, 
    backgroundColor: `${ isDarkMode ? 'var(--card-background-dark)' : 'var(--card-background-light)' }`
  }

  const svgStyle = {
    stroke: `${ isDarkMode ? 'var(--white)' : 'var(--black)' }`,
  }
  
  const errorStyle = {
    opacity: `${isError ? '1' : '0'}`,
  }

  function keyPressEvent(event) {
    if (event.charCode === 13) {
      enter(query);
    }
  }

  return (
    <div className="search-bar">
      <input type="text" placeholder="Suche nach einem Ort..."
        style={inputStyle}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => keyPressEvent(e)}
      />
      <svg width="24" height="24" viewBox="0 0 24 24" className="x" style={svgStyle} onClick={() => setQuery('')}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      <svg width="24" height="24" viewBox="0 0 24 24" className="search" style={svgStyle} onClick={() => enter(query)}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <p className="error" style={errorStyle}>'{query}' wurde nicht gefunden.</p>
    </div>
  )
}

export default Searchbar
