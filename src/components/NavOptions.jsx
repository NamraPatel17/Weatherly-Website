import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import ContactModal from "./ContactModal";
import AboutModal from "./AboutModal";
import SavedLocationsModal from "./SavedLocationsModal";
import SettingsModal from "./SettingsModal";
import "./Header.css";

function NavOptions({ onClose, savedLocations, addSavedLocation, removeSavedLocation, selectSavedLocation, units, setTempUnit, setWindUnit }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleContactClick = (e) => {
    e.preventDefault();
    setContactOpen(true);
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    setAboutOpen(true);
  };

  const handleSavedClick = (e) => {
    e.preventDefault();
    setSavedOpen(true);
  };

  const handleSettingsClick = (e) => {
    e.preventDefault();
    setSettingsOpen(true);
  };

  const handleCloseContact = () => {
    setContactOpen(false);
    if (onClose) onClose();
  };

  const handleCloseAbout = () => {
    setAboutOpen(false);
    if (onClose) onClose();
  };

  const handleCloseSaved = () => {
    setSavedOpen(false);
    if (onClose) onClose();
  };

  const handleCloseSettings = () => {
    setSettingsOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      <div className="nav-options-dropdown" tabIndex={-1}>
        <button className="close-btn" onClick={onClose} aria-label="Close navigation menu">
          <FiX size={22} />
        </button>
        <a href="/" onClick={onClose}>Home</a>
        <a href="https://github.com/NamraPatel17" target="_blank" rel="noopener noreferrer" onClick={onClose}>GitHub</a>
        <a href="#about" onClick={handleAboutClick}>About</a>
        <a href="#saved" onClick={handleSavedClick}>Saved Location</a>
        <a href="#settings" onClick={handleSettingsClick}>Setting</a>
        <a href="#contact" onClick={handleContactClick}>Contact</a>
      </div>
      <ContactModal isOpen={contactOpen} onClose={handleCloseContact} />
      <AboutModal isOpen={aboutOpen} onClose={handleCloseAbout} />
      <SavedLocationsModal
        isOpen={savedOpen}
        onClose={handleCloseSaved}
        savedLocations={savedLocations}
        addSavedLocation={addSavedLocation}
        removeSavedLocation={removeSavedLocation}
        selectSavedLocation={selectSavedLocation}
      />
      <SettingsModal
        isOpen={settingsOpen}
        onClose={handleCloseSettings}
        units={units}
        setTempUnit={setTempUnit}
        setWindUnit={setWindUnit}
      />
    </>
  );
}

export default NavOptions; 