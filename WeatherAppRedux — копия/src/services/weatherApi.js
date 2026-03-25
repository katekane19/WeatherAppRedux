import axios from "axios";

const API_KEY = "31c731ef729e7bc35a3a2bbb0b208c92";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const city = config.params.city;

    config.url = `${BASE_URL}`;
    config.params = {
      q: city,
      units: "metric",
      appid: API_KEY,
    };

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Network error";

    return Promise.reject(new Error(message));
  }
);

export const fetchWeather = async (city) => {
  const data = await api.get("", {
    params: { city },
  });

  if (data.cod !== 200) {
    throw new Error(data.message || "City not found");
  }

  return data;
};

export const getWeatherIcon = (condition) => {
  const icons = {
    Clear: "/images/clear.png",
    Clouds: "/images/clouds.png",
    Rain: "/images/rain.png",
    Drizzle: "/images/drizzle.png",
    Mist: "/images/mist.png",
    Fog: "/images/mist.png",
    Snow: "/images/snow.png",
  };
  return icons[condition] || "/images/clouds.png";
};