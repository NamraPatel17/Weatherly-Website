import React, { useState } from "react";
import { WiDaySunny } from "react-icons/wi";
import { FiMenu, FiMapPin } from "react-icons/fi";
import NavOptions from "./NavOptions";
import { fetchWeatherByCoords } from "../api";
import "./Header.css";

function Header({ input, setInput, handleSearch, loading, savedLocations, addSavedLocation, removeSavedLocation, selectSavedLocation, units, setTempUnit, setWindUnit }) {
  const [navOpen, setNavOpen] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState("");
  const [locWeather, setLocWeather] = useState(null);

  // Detect mobile view
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches;

  const handleLocationClick = async () => {
    setShowLocation(true);
    setLocLoading(true);
    setLocError("");
    setLocWeather(null);
    if (!navigator.geolocation) {
      setLocError("Geolocation not supported.");
      setLocLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetchWeatherByCoords(latitude, longitude);
          setLocWeather(res.data);
        } catch (err) {
          setLocError("Could not fetch weather for your location.");
        }
        setLocLoading(false);
      },
      (err) => {
        setLocError("Location access denied.");
        setLocLoading(false);
      }
    );
  };

  return (
    <header className="header" style={{ position: 'relative' }}>
      {!navOpen && (
        <button
          className="menu-btn absolute-menu"
          aria-label="Open navigation menu"
          onClick={() => setNavOpen(true)}
        >
          <FiMenu size={28} />
        </button>
      )}
      {navOpen && (
        <NavOptions
          onClose={() => setNavOpen(false)}
          savedLocations={typeof savedLocations !== 'undefined' ? savedLocations : []}
          addSavedLocation={typeof addSavedLocation !== 'undefined' ? addSavedLocation : () => {}}
          removeSavedLocation={typeof removeSavedLocation !== 'undefined' ? removeSavedLocation : () => {}}
          selectSavedLocation={typeof selectSavedLocation !== 'undefined' ? selectSavedLocation : () => {}}
          units={typeof units !== 'undefined' ? units : { temp: 'C', wind: 'kmh' }}
          setTempUnit={typeof setTempUnit !== 'undefined' ? setTempUnit : () => {}}
          setWindUnit={typeof setWindUnit !== 'undefined' ? setWindUnit : () => {}}
        />
      )}
      <div className="header-center">
        <div className="header-title-group" style={{ display: 'flex', alignItems: 'center', flexDirection: isMobile ? 'row' : 'column', gap: isMobile ? 8 : 0 }}>
          <div className="header-title">Weatherly</div>
          {isMobile && (
            <button
              className="location-btn header-location-btn"
              aria-label="Show current location weather"
              onClick={handleLocationClick}
              style={{ marginLeft: 8 }}
            >
              <FiMapPin size={22} />
            </button>
          )}
        </div>
        <div className="header-slogan">
          <WiDaySunny className="slogan-icon" />
          <span className="slogan-text">Your daily weather companion</span>
        </div>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            className="search-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter city"
            disabled={loading}
          />
          <button type="submit" className="search-btn" disabled={loading}>
            Search
          </button>
        </form>
      </div>
      {/* Location button at far right for desktop */}
      {!isMobile && (
        <button
          className="location-btn header-location-btn"
          aria-label="Show current location weather"
          onClick={handleLocationClick}
          style={{ position: 'absolute', right: 24, top: 24, zIndex: 100 }}
        >
          <FiMapPin size={26} />
        </button>
      )}
      {/* Location Modal Overlay */}
      {showLocation && (
        <div className="location-modal-overlay">
          <div className="location-popover-content">
            <button className="close-btn" onClick={() => setShowLocation(false)} aria-label="Close location modal">×</button>
            <div className="location-popover-title">Current Location</div>
            {locLoading && <div className="location-popover-desc">Loading...</div>}
            {locError && <div className="location-popover-desc" style={{color: '#f44336'}}>{locError}</div>}
            {locWeather && (
              <>
                <div className="location-popover-city">{locWeather.name}</div>
                <div className="location-popover-temp">{Math.round(locWeather.main.temp)}°C</div>
                <div className="location-popover-desc">{locWeather.weather[0].main}</div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
