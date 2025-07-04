import React from "react";
import { FiX } from "react-icons/fi";
import "./ContactModal.css";

function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="contact-modal-backdrop" onClick={onClose}>
      <div className="contact-modal" onClick={e => e.stopPropagation()} tabIndex={-1}>
        <button className="contact-modal-close" onClick={onClose} aria-label="Close about modal">
          <FiX size={22} />
        </button>
        <h2 className="contact-modal-title">About Weatherly</h2>
        <div className="about-modal-content">
          <p><b>Weatherly</b> is your modern, daily weather companion. Get current weather, 5-day forecasts, air quality, UV index, and more—all in a clean, responsive interface.</p>
          <ul>
            <li>Data powered by <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a>.</li>
            <li>Built with React and modern web technologies.</li>
            <li>Designed for all devices—mobile, tablet, and desktop.</li>
          </ul>
          <hr className="about-modal-divider" />
          <div className="about-modal-footer">
            Created by Namra Patel.<br />
            For feedback or questions, use the Contact form!
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutModal; 