import React from "react";
import "./WeatherHeader.css";
import {
  WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiDust, WiTornado, WiSprinkle
} from "react-icons/wi";

function WeatherHeader({ weather, city, loading, units, forecast }) {
  function getWeatherIcon(main) {
    main = main.toLowerCase();
    if (main.includes("cloud")) return <WiCloudy size={90} color="#888" />;
    if (main.includes("rain")) return <WiRain size={90} color="#4e54c8" />;
    if (main.includes("clear")) return <WiDaySunny size={90} color="#ffa751" />;
    if (main.includes("snow")) return <WiSnow size={90} color="#b3d0f7" />;
    if (main.includes("thunderstorm")) return <WiThunderstorm size={90} color="#414345" />;
    if (main.includes("drizzle")) return <WiSprinkle size={90} color="#66a6ff" />;
    if (main.includes("mist") || main.includes("fog") || main.includes("haze")) return <WiFog size={90} color="#cfd9df" />;
    if (main.includes("dust") || main.includes("sand") || main.includes("ash")) return <WiDust size={90} color="#94716b" />;
    if (main.includes("tornado")) return <WiTornado size={90} color="#2c3e50" />;
    return <WiDaySunny size={90} color="#b3d0f7" />;
  }

  // Capitalize city name
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Convert Celsius to Fahrenheit
  function toF(tempC) {
    return tempC * 9/5 + 32;
  }

  function displayTemp(temp) {
    if (!units || units.temp === "C") return Math.round(temp) + "°C";
    return Math.round(toF(temp)) + "°F";
  }

  // Get today's min/max from forecast if available
  let min = weather?.main?.temp_min;
  let max = weather?.main?.temp_max;
  if (forecast && forecast.list && forecast.list.length > 0) {
    const today = new Date().toISOString().split("T")[0];
    const todayTemps = forecast.list.filter(item => item.dt_txt.startsWith(today));
    if (todayTemps.length > 0) {
      min = Math.min(...todayTemps.map(item => item.main.temp_min));
      max = Math.max(...todayTemps.map(item => item.main.temp_max));
    }
  }
  if (min > max) {
    [min, max] = [max, min];
  }

  return (
    <div className="weather-header">
      {weather ? (
        <>
          <div className="city-name">{capitalize(city)}</div>
          <div className="weather-icons">
            {getWeatherIcon(weather.weather[0].main)}
          </div>
          <div className="weather-temp">{displayTemp(weather.main.temp)}</div>
          <div className="weather-desc">{weather.weather[0].main}</div>
          <div className="weather-range">
            {displayTemp(min)} / {displayTemp(max)}
          </div>
        </>
      ) : (
        <div className="weather-loading">Loading...</div>
      )}
    </div>
  );
}

export default WeatherHeader;
