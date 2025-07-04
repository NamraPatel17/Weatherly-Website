import React from "react";
import { FiX } from "react-icons/fi";
import "./ContactModal.css";

function SettingsModal({ isOpen, onClose, units, setTempUnit, setWindUnit }) {
  if (!isOpen) return null;

  return (
    <div className="contact-modal-backdrop" onClick={onClose}>
      <div className="contact-modal" onClick={e => e.stopPropagation()} tabIndex={-1}>
        <button className="contact-modal-close" onClick={onClose} aria-label="Close settings modal">
          <FiX size={22} />
        </button>
        <h2 className="contact-modal-title">Setting</h2>
        <div style={{marginBottom: 28}}>
          <div style={{marginBottom: 24}}>
            <label style={{fontWeight: 600, color: '#234', fontSize: '1.1rem'}}>Temperature Unit:</label>
            <div className="unit-toggle-group" style={{display: 'flex', gap: 12, marginTop: 12}}>
              <button
                type="button"
                className={`unit-toggle-btn${units.temp === 'C' ? ' active' : ''}`}
                onClick={() => setTempUnit('C')}
                aria-pressed={units.temp === 'C'}
              >
                °C
              </button>
              <button
                type="button"
                className={`unit-toggle-btn${units.temp === 'F' ? ' active' : ''}`}
                onClick={() => setTempUnit('F')}
                aria-pressed={units.temp === 'F'}
              >
                °F
              </button>
            </div>
          </div>
          <div>
            <label style={{fontWeight: 600, color: '#234', fontSize: '1.1rem'}}>Wind Speed Unit:</label>
            <div className="unit-toggle-group" style={{display: 'flex', gap: 12, marginTop: 12}}>
              <button
                type="button"
                className={`unit-toggle-btn${units.wind === 'kmh' ? ' active' : ''}`}
                onClick={() => setWindUnit('kmh')}
                aria-pressed={units.wind === 'kmh'}
              >
                km/h
              </button>
              <button
                type="button"
                className={`unit-toggle-btn${units.wind === 'mph' ? ' active' : ''}`}
                onClick={() => setWindUnit('mph')}
                aria-pressed={units.wind === 'mph'}
              >
                mph
              </button>
            </div>
          </div>
        </div>
        <button className="contact-modal-send" style={{marginTop: 18, width: '100%'}} onClick={onClose}>Done</button>
      </div>
    </div>
  );
}

export default SettingsModal; 