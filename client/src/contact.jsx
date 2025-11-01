import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Contact() {




  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Captured Form Data:", formData);
    navigate("/");
  }

  return (
    <div className="contact">
      <h1>Contact Me</h1>
      <p>Email: 2000dev.p@gmail.com | Phone: (647) 901-9875 | Location: Toronto, ON</p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Contact Number" onChange={handleChange} />
        <textarea name="message" placeholder="Your Message" onChange={handleChange} required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

