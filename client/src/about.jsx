import React from "react";
import profile from "./assets/profile.jpg";

export default function About() {
  return (
    <section id="about" style={{ padding: "2rem", textAlign: "center" }}>
      <h2 style={{ fontSize: "2.5rem", color: "#646cff", marginBottom: "1rem" }}>About Me</h2>

      <img
        src={profile}
        alt="Dev Patel"
        width="200"
        style={{
          borderRadius: "50%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          marginBottom: "1rem"
        }}
      />

      <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
        I'm Dev Patel, a Junior Software Developer passionate about full-stack development and cloud computing.
        I love building scalable web apps and exploring cloud-native architectures.
      </p>

      <a
        href="/Devresume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          marginTop: "1.5rem",
          padding: "0.75em 1.5em",
          backgroundColor: "#646cff",
          color: "#fff",
          borderRadius: "8px",
          fontWeight: "500",
          textDecoration: "none",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease"
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#535bf2";
          e.target.style.boxShadow = "0 0 10px #535bf288";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#646cff";
          e.target.style.boxShadow = "none";
        }}
      >
        📄 View My Resume
      </a>
    </section>
  );
}
