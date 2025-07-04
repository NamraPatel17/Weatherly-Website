import React from "react";
import "./HourlyForecast.css";

function getHour(dt_txt) {
  const date = new Date(dt_txt);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function HourlyForecast({ forecast, loading, units }) {
  if (loading) return <div className="forecast-card">Loading hourly forecast...</div>;
  if (!forecast) return <div className="forecast-card">No forecast data.</div>;

  // Convert Celsius to Fahrenheit
  function toF(tempC) {
    return tempC * 9/5 + 32;
  }
  function displayTemp(temp) {
    if (!units || units.temp === "C") return Math.round(temp) + "°C";
    return Math.round(toF(temp)) + "°F";
  }

  // Get next 8 intervals (24 hours, 3-hour steps)
  const hours = forecast.list.slice(0, 8);

  return (
    <div className="forecast-card hourly-forecast">
      <div className="forecast-title">24-hour forecast</div>
      <div className="hourly-list">
        {hours.map((item, idx) => (
          <div className="hourly-item" key={idx}>
            <div className="hourly-time">{getHour(item.dt_txt)}</div>
            <img
              className="hourly-icon"
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].main}
            />
            <div className="hourly-temp">{displayTemp(item.main.temp)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
