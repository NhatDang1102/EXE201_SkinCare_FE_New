import { useState } from "react";
import axios from "axios";

import './ContactUs.css'

export default function ContactUs() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    // Prevent page refresh
    e.preventDefault();

    axios
      .post(
        "https://",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          message: message
        },
        {
          headers: {
            Accept: "application/json"
          }
        }
      )
      .then((res) => {
        // success http code
        if (res.data.code === 200) {
          setSubmitted(true);
        } else {
          setError(res.data.message);
        }
      });
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (submitted) {
    return <p>We've received your message, thank you for contacting us!</p>;
  }

  return (
    <form onSubmit={submit} className="contactUsForm">
      <div className="contactUsTitle">Contact Us</div>
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        value={firstName}
        placeholder="First name"
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <label htmlFor="lastName">Last name</label>
      <input
        id="lastName"
        value={lastName}
        placeholder="Last name"
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <label htmlFor="email">Email address</label>
      <input
        id="email"
        type="email"
        value={email}
        placeholder="email@skincaredomain.com"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="message">Your message</label>
      <textarea
        id="message"
        value={message}
        placeholder="Enter your question or message"
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit">Send</button>
    </form>
  );
}
