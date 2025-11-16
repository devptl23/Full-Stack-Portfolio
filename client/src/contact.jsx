import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from './api/api-contact.js';
import auth from './auth/auth-helper.js';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: ""
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const jwt = auth.isAuthenticated();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on change
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Create contact object matching backend schema
    const contact = {
      firstname: formData.firstname || undefined,
      lastname: formData.lastname || undefined,
      email: formData.email || undefined
    };

    // Create contact without auth (public form) or with auth if logged in
    const credentials = jwt ? { t: jwt.token } : { t: '' };

    create(contact, credentials).then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setSuccess(true);
        setFormData({ firstname: "", lastname: "", email: "" });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  }

  return (
    <div className="contact">
      <h1>Contact Me</h1>
      <p>Email: 2000dev.p@gmail.com | Phone: (647) 901-9875 | Location: Toronto, ON</p>

      {success && (
        <div style={{
          padding: '15px',
          backgroundColor: '#d4edda',
          color: '#155724',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          Thank you! Your message has been sent successfully. Redirecting...
        </div>
      )}

      {error && (
        <div style={{
          padding: '15px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

