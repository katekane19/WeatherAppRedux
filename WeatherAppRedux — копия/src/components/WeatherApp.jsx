import './WeatherApp.css';

import SearchBar from './SearchBar';
import WeatherInfo from './WeatherInfo';

import { useSelector } from 'react-redux';

function WeatherApp() {
  const { error, loading, weather } = useSelector(
    (state) => state.weather
  );

  return (
    <div className="card">
      <SearchBar />

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Loading...</p>}

      {weather && <WeatherInfo />}
    </div>
  );
}

export default WeatherApp;