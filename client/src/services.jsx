import React from "react";
import fullstackImg from "./assets/fullstack.png";
import mobileappImg from "./assets/mobileapp.jpg";
import cloudImg from "./assets/cloudcomputing.png";
import databaseImg from "./assets/database.png";
import mlImg from "./assets/machinelearning.jpg";

export default function Services() {
  const services = [
    {
      title: "🌐 Full-Stack Web Development",
      image: fullstackImg,
      alt: "Full-Stack Development",
    },
    {
      title: "📱 Mobile App Development",
      image: mobileappImg,
      alt: "Mobile App Development",
    },
    {
      title: "☁️ Cloud Solutions (AWS, Azure, GCP)",
      image: cloudImg,
      alt: "Cloud Computing",
    },
    {
      title: "🛠 Database Design & Management",
      image: databaseImg,
      alt: "Database Management",
    },
    {
      title: "🤖 AI & Machine Learning Projects",
      image: mlImg,
      alt: "Machine Learning",
    },
  ];

  return (
    <section style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#646cff", marginBottom: "2rem" }}>Services</h1>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
        {services.map((service, index) => (
          <div key={index} style={{ maxWidth: "300px", textAlign: "center" }}>
            <img
              src={service.image}
              alt={service.alt}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{service.title}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}
