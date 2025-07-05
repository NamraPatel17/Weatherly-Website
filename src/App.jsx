import React, { useState, useEffect } from "react";
import { fetchWeather, fetchForecast, fetchAQI } from "./api";
import WeatherHeader from "./components/WeatherHeader";
import Forecast from "./components/Forecast";
import WeatherDetails from "./components/WeatherDetails";
import AQICard from "./components/AQICard";
import Spinner from "./components/Spinner";
import "./App.css";
import axios from "axios";
import HourlyForecast from "./components/HourlyForecast";
import FunFactsTips from "./components/FunFactsTips";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [city, setCity] = useState("Gajan");
  const [input, setInput] = useState(city);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uvIndex, setUvIndex] = useState(null);
  const [savedLocations, setSavedLocations] = useState(() => {
    const saved = localStorage.getItem("weatherly_saved_locations");
    return saved ? JSON.parse(saved) : [];
  });
  // Units state
  const [units, setUnits] = useState(() => {
    const saved = localStorage.getItem("weatherly_units");
    return saved ? JSON.parse(saved) : { temp: "C", wind: "kmh" };
  });

  useEffect(() => {
    localStorage.setItem("weatherly_saved_locations", JSON.stringify(savedLocations));
  }, [savedLocations]);

  useEffect(() => {
    localStorage.setItem("weatherly_units", JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const weatherRes = await fetchWeather(city);
        setWeather(weatherRes.data);

        const forecastRes = await fetchForecast(city);
        setForecast(forecastRes.data);

        const { lat, lon } = weatherRes.data.coord;
        const aqiRes = await fetchAQI(lat, lon);
        setAqi(aqiRes.data);

        // Fetch UV index from Open-Meteo
        const uvRes = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=uv_index`
        );
        setUvIndex(uvRes.data.current?.uv_index ?? null);
      } catch (err) {
        console.log("City not found. Please try another city.");
      }
      setLoading(false);
    };
    fetchAll();
  }, [city]);

  function getBgClass(weather) {
    if (!weather) return "bg-default";
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes("cloud")) return "bg-cloudy";
    if (main.includes("rain")) return "bg-rainy";
    if (main.includes("clear")) return "bg-sunny";
    if (main.includes("snow")) return "bg-snowy";
    if (main.includes("thunderstorm")) return "bg-thunder";
    if (main.includes("drizzle")) return "bg-drizzle";
    if (main.includes("mist") || main.includes("fog") || main.includes("haze")) return "bg-mist";
    if (main.includes("dust") || main.includes("sand") || main.includes("ash")) return "bg-dust";
    if (main.includes("tornado")) return "bg-tornado";
    return "bg-default";
  }

  // Handle search bar submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) setCity(input.trim());
  };

  // Saved Locations Functions
  const addSavedLocation = (loc) => {
    if (!loc || savedLocations.includes(loc)) return;
    setSavedLocations([...savedLocations, loc]);
  };

  const removeSavedLocation = (loc) => {
    setSavedLocations(savedLocations.filter((l) => l !== loc));
  };

  const selectSavedLocation = (loc) => {
    setCity(loc);
    setInput(loc);
  };

  // Unit change functions
  const setTempUnit = (unit) => {
    setUnits((prev) => ({ ...prev, temp: unit }));
  };
  const setWindUnit = (unit) => {
    setUnits((prev) => ({ ...prev, wind: unit }));
  };

  // Extract AQI value for WeatherHeader
  let aqiValue = "--";
  if (aqi && aqi.list && aqi.list.length > 0) {
    aqiValue = aqi.list[0].main.aqi;
  }

  return (
    <div className="main-wrapper">
      <Header
        input={input}
        setInput={setInput}
        handleSearch={handleSearch}
        loading={loading}
        savedLocations={savedLocations}
        addSavedLocation={addSavedLocation}
        removeSavedLocation={removeSavedLocation}
        selectSavedLocation={selectSavedLocation}
        units={units}
        setTempUnit={setTempUnit}
        setWindUnit={setWindUnit}
      />
      <div className={`app-container ${getBgClass(weather)}`}>
        <div className="content-wrapper">
          <div className="weather-main">
            <WeatherHeader
              weather={weather}
              city={city}
              aqiValue={aqiValue}
              loading={loading}
              units={units}
              forecast={forecast}
            />
            <HourlyForecast forecast={forecast} loading={loading} units={units} />
            <Forecast forecast={forecast} loading={loading} units={units} />
          </div>
          <div className="weather-side">
            <WeatherDetails weather={weather} loading={loading} uvIndex={uvIndex} units={units} />
            <AQICard aqi={aqi} loading={loading} />
            <FunFactsTips />
          </div>
          {loading && <Spinner />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
