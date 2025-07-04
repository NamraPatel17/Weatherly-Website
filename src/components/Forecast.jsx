import React from "react";
import "./Forecast.css";

function getDayName(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { weekday: "short" });
}

function Forecast({ forecast, loading, units }) {
  if (loading) {
    return <div className="forecast-card">Loading forecast...</div>;
  }
  if (!forecast) {
    return <div className="forecast-card">No forecast data.</div>;
  }

  // Convert Celsius to Fahrenheit
  function toF(tempC) {
    return tempC * 9/5 + 32;
  }
  function displayTemp(temp) {
    if (!units || units.temp === "C") return Math.round(temp) + "°C";
    return Math.round(toF(temp)) + "°F";
  }

  // Group forecast by day (OpenWeatherMap gives 3-hour intervals)
  const daily = [];
  const map = {};
  forecast.list.forEach((item) => {
    const day = item.dt_txt.split(" ")[0];
    if (!map[day]) {
      map[day] = {
        min: item.main.temp_min,
        max: item.main.temp_max,
        icon: item.weather[0].icon,
        date: item.dt_txt,
      };
      daily.push(map[day]);
    } else {
      map[day].min = Math.min(map[day].min, item.main.temp_min);
      map[day].max = Math.max(map[day].max, item.main.temp_max);
    }
  });

  // Only show next 5 days
  const days = daily.slice(0, 5);

  return (
    <div className="forecast-card">
      <div className="forecast-title">5-day forecast</div>
      <div className="forecast-list">
        {days.map((day, idx) => (
          <div className="forecast-item" key={idx}>
            <div className="forecast-day">{idx === 0 ? "Today" : getDayName(day.date)}</div>
            <img
              className="forecast-icon"
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt=""
            />
            <div className="forecast-temp">
              <span>{displayTemp(day.min)}</span> / <span>{displayTemp(day.max)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
