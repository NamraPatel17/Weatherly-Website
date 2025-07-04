import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import ContactModal from "./ContactModal";
import "./Footer.css";

function Footer() {
  const [contactOpen, setContactOpen] = useState(false);

  const handleContactClick = (e) => {
    e.preventDefault();
    setContactOpen(true);
  };

  const handleCloseModal = () => {
    setContactOpen(false);
  };

  return (
    <footer className="footer">
      <span>
        &copy; {new Date().getFullYear()} Your Weather App &mdash; Powered by OpenWeatherMap
      </span>
      <div className="footer-socials">
        <a href="https://www.linkedin.com/in/namra04/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        <a href="https://github.com/NamraPatel17" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://www.instagram.com/_namra.17_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
      </div>
      <div className="footer-contact">
        <button className="footer-contact-btn" onClick={handleContactClick}>Contact Us</button>
      </div>
      <ContactModal isOpen={contactOpen} onClose={handleCloseModal} />
    </footer>
  );
}

export default Footer;
