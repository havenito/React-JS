import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import emailjs from "emailjs-com";
import "./Contact.scss";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const templateParams = {
      name,
      email,
      message,
    };

    try {
      console.log("Sending email with params:", templateParams);
      const response = await emailjs.send(
        "service_bzb6ghb", // Remplacez par votre service ID EmailJS
        "template_a5wxw18", // Remplacez par votre template ID EmailJS
        templateParams,
        "NnPZUILSJg-KYKuCV" // Remplacez par votre user ID EmailJS
      );
      console.log("Email sent successfully:", response);

      setSubmitted(true);
      setError(null);
    } catch (err) {
      console.error("Error sending email:", err);
      setError("Erreur lors de l'envoi du formulaire");
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000); // Redirige après 3 secondes

      return () => clearTimeout(timer); // Nettoie le timer si le composant est démonté
    }
  }, [submitted, navigate]);

  return (
    <div className="contact">
      {submitted ? (
        <div className="confirmation">
          <h2>Merci, {name}!</h2>
          <p>Votre message a été envoyé avec succès.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Contactez-nous</h2>
          {error && <p className="error">{error}</p>}
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Envoyer</button>
        </form>
      )}
    </div>
  );
}