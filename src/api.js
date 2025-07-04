import axios from "axios";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "822911cb7c9f994306d77b9c2cacd16d";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const AQI_URL = "https://api.openweathermap.org/data/2.5/air_pollution";

export const fetchWeather = (city) =>
  axios.get(API_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });

export const fetchForecast = (city) =>
  axios.get(FORECAST_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
    },
  });

export const fetchAQI = (lat, lon) =>
  axios.get(AQI_URL, {
    params: {
      lat,
      lon,
      appid: API_KEY,
    },
  });

export const fetchWeatherByCoords = (lat, lon) =>
  axios.get(API_URL, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: "metric",
    },
  });
