import React from "react";
import { WiDaySunny, WiHumidity, WiThermometer, WiStrongWind, WiSunset, WiBarometer } from "react-icons/wi";
import "./WeatherDetails.css";

function getSunsetTime(timestamp) {
  if (!timestamp) return "--";
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function WeatherDetails({ weather, loading, uvIndex, units }) {
  if (loading) {
    return <div className="details-card">Loading details...</div>;
  }
  if (!weather) {
    return <div className="details-card">No details available.</div>;
  }

  // Convert Celsius to Fahrenheit
  function toF(tempC) {
    return tempC * 9/5 + 32;
  }
  // Convert m/s to km/h or mph
  function windSpeed(speedMs) {
    if (!units || units.wind === "kmh") return Math.round(speedMs * 3.6) + " km/h";
    return Math.round(speedMs * 2.237) + " mph";
  }
  function displayTemp(temp) {
    if (!units || units.temp === "C") return Math.round(temp) + "°C";
    return Math.round(toF(temp)) + "°F";
  }

  // OpenWeatherMap's free API does not provide UV index directly.
  // We'll show "Weak" as a placeholder for UV, or you can fetch from another API if needed.
  const uv = "Weak";
  const uvValue = 2;

  return (
    <div className="details-card">
      <div className="details-grid">
        <div className="details-item">
          <div className="details-label">UV</div>
          <WiDaySunny size={32} color="#f7b267" />
          <div className="details-value">{uvIndex !== null ? uvIndex : "--"}</div>
          <div className="details-bar uv-bar">
            <div style={{ width: `${Math.min(uvIndex || 0, 10) * 10}%` }} />
          </div>
        </div>
        <div className="details-item">
          <div className="details-label">Humidity</div>
          <WiHumidity size={32} color="#4e54c8" />
          <div className="details-value">{weather.main.humidity}%</div>
        </div>
        <div className="details-item">
          <div className="details-label">Real feel</div>
          <WiThermometer size={32} color="#f76e6e" />
          <div className="details-value">{displayTemp(weather.main.feels_like)}</div>
        </div>
        <div className="details-item">
          <div className="details-label">Wind</div>
          <WiStrongWind size={32} color="#3a6ea5" />
          <div className="details-value">{windSpeed(weather.wind.speed)}</div>
        </div>
        <div className="details-item">
          <div className="details-label">Sunset</div>
          <WiSunset size={32} color="#f7b267" />
          <div className="details-value">{getSunsetTime(weather.sys.sunset)}</div>
        </div>
        <div className="details-item">
          <div className="details-label">Pressure</div>
          <WiBarometer size={32} color="#3a6ea5" />
          <div className="details-value">{weather.main.pressure} mbar</div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;
