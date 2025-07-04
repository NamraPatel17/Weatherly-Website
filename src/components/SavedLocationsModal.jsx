import React, { useState } from "react";
import { FiX, FiTrash2, FiPlus } from "react-icons/fi";
import "./ContactModal.css";

function SavedLocationsModal({ isOpen, onClose, savedLocations, addSavedLocation, removeSavedLocation, selectSavedLocation }) {
  const [newLoc, setNewLoc] = useState("");

  if (!isOpen) return null;

  const handleAdd = (e) => {
    e.preventDefault();
    if (newLoc.trim()) {
      addSavedLocation(newLoc.trim());
      setNewLoc("");
    }
  };

  return (
    <div className="contact-modal-backdrop" onClick={onClose}>
      <div className="contact-modal" onClick={e => e.stopPropagation()} tabIndex={-1}>
        <button className="contact-modal-close" onClick={onClose} aria-label="Close saved locations modal">
          <FiX size={22} />
        </button>
        <h2 className="contact-modal-title">Saved Location</h2>
        <form className="contact-modal-form" onSubmit={handleAdd} style={{marginBottom: 10}}>
          <input
            className="contact-modal-input"
            type="text"
            placeholder="Add new city..."
            value={newLoc}
            onChange={e => setNewLoc(e.target.value)}
            maxLength={32}
          />
          <button type="submit" className="contact-modal-send add-location-btn">
            <FiPlus /> Add
          </button>
        </form>
        <ul style={{listStyle: 'none', padding: 0, margin: 0, maxHeight: 180, overflowY: 'auto'}}>
          {savedLocations.length === 0 && (
            <li style={{color: '#888', textAlign: 'center', margin: '18px 0'}}>No saved locations yet.</li>
          )}
          {savedLocations.map((loc) => (
            <li key={loc} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #e0eafc'}}>
              <button
                style={{background: 'none', border: 'none', color: '#234', fontWeight: 600, fontSize: '1.08rem', cursor: 'pointer', flex: 1, textAlign: 'left'}}
                onClick={() => { selectSavedLocation(loc); onClose(); }}
                aria-label={`Select ${loc}`}
              >
                {loc}
              </button>
              <button
                style={{background: 'none', border: 'none', color: '#f44336', marginLeft: 8, cursor: 'pointer', fontSize: '1.1rem'}}
                onClick={() => removeSavedLocation(loc)}
                aria-label={`Remove ${loc}`}
                title="Remove"
              >
                <FiTrash2 />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SavedLocationsModal; 