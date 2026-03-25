import { useSelector } from 'react-redux';

function WeatherInfo() {
  const weather = useSelector((state) => state.weather.weather);

  if (!weather) return null;

  // Получаем данные безопасно
  const temp = weather.temp ?? weather.main?.temp ?? 'N/A';
  const city = weather.city ?? weather.name ?? 'Unknown';
  const humidity = weather.humidity ?? weather.main?.humidity ?? 'N/A';
  const windSpeed = weather.wind?.speed ?? 'N/A';

  // Определяем тип погоды безопасно
  let weatherMain = 'clear'; // дефолт
  if (weather.weather && Array.isArray(weather.weather) && weather.weather[0]?.main) {
    weatherMain =
      typeof weather.weather[0].main === 'string'
        ? weather.weather[0].main.toLowerCase()
        : 'clear';
  }

  // Сопоставление типов погоды с твоими локальными картинками
  const weatherIcons = {
    clear: '/images/clear.png',
    clouds: '/images/clouds.png',
    drizzle: '/images/drizzle.png',
    rain: '/images/rain.png',
    snow: '/images/snow.png',
    mist: '/images/mist.png',
  };

  const iconUrl = weatherIcons[weatherMain] || '/images/clear.png';

  return (
    <div className="weather">
      <img src={iconUrl} className="weather-icon" alt={weatherMain} />
      <h1 className="temp">{temp}°C</h1>
      <h2 className="city">{city}</h2>

      <div className="details">
        <div className="col">
          <img src="/images/humidity.png" alt="Humidity" />
          <div>
            <p className="humidity">{humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>

        <div className="col">
          <img src="/images/wind.png" alt="Wind" />
          <div>
            <p className="wind">{windSpeed} km/h</p>
            <p>Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;