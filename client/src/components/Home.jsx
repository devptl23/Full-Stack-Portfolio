import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Home = () => {
  return (
    <section style={{ padding: "2rem", textAlign: "center" }}>
      <img
        src={logo}
        alt="Dev Patel Logo"
        style={{
          width: "120px",
          marginBottom: "1rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      />

      <p style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "1rem" }}>
        Mission: To build intelligent, scalable software that solves real-world problems.
      </p>

      <Link to="/about">
        <button
          style={{
            padding: "0.75em 1.5em",
            backgroundColor: "#e74c3c",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#c0392b";
            e.target.style.boxShadow = "0 0 10px #e74c3c88";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#e74c3c";
            e.target.style.boxShadow = "none";
          }}
        >
          Learn More About Me
        </button>
      </Link>
    </section>
  );
};

export default Home;
