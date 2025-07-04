import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import "./ContactModal.css";

function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:namrapatel@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailto, "_blank");
    onClose();
  };

  return (
    <div className="contact-modal-backdrop" onClick={onClose}>
      <div className="contact-modal" onClick={e => e.stopPropagation()} tabIndex={-1}>
        <button className="contact-modal-close" onClick={onClose} aria-label="Close contact form">
          <FiX size={22} />
        </button>
        <h2 className="contact-modal-title">Contact Us</h2>
        <form className="contact-modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="contact-modal-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="contact-modal-input"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="contact-modal-input"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="contact-modal-textarea"
            rows={5}
          />
          <button type="submit" className="contact-modal-send">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactModal; 