import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCity, searchWeather } from '../store/weatherSlice';

function SearchBar() {
  const dispatch = useDispatch();
  const { currentCity, loading } = useSelector((state) => state.weather);

  const [inputValue, setInputValue] = useState(currentCity);

  useEffect(() => {
    setInputValue(currentCity);
  }, [currentCity]);

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      dispatch(setCurrentCity(trimmed));
      dispatch(searchWeather(trimmed));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Enter city name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
      />
      <button onClick={handleSearch} disabled={loading}>
        <img 
          src="/images/search.png" 
          alt="Search" 
          style={{ width: '20px', height: '20px' }}
        />
      </button>
    </div>
  );
}

export default SearchBar;