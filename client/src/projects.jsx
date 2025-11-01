import React from "react";
import gpaImg from "./assets/gpa.png";
import webappImg from "./assets/webapp.png";
import k8Img from "./assets/K8.png";

export default function Projects() {
  return (
    <section style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#646cff", marginBottom: "2rem" }}>My Projects</h1>

      <div className="project-text" style={{ marginBottom: "3rem" }}>
        <img
          src={gpaImg}
          alt="GPA Calculator"
          style={{ width: "300px", borderRadius: "8px", marginBottom: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        />
        <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>GPA Calculator</h2>
        <p style={{ maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
          Created a Grade Point Average calculator using C#, allowing users to enter weighted grades and receive accurate GPA calculations.
        </p>
      </div>

      <div className="project-text" style={{ marginBottom: "3rem" }}>
        <img
          src={webappImg}
          alt="Serverless Web App"
          style={{ width: "300px", borderRadius: "8px", marginBottom: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        />
        <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Serverless Web App</h2>
        <p style={{ maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
          Developed an Uber-like ride request app using AWS Lambda, API Gateway, DynamoDB, and Cognito with an HTML-based interface.
        </p>
      </div>

      <div className="project-text">
        <img
          src={k8Img}
          alt="Kubernetes Cluster"
          style={{ width: "300px", borderRadius: "8px", marginBottom: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        />
        <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Kubernetes Cluster</h2>
        <p style={{ maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
          Built a Kubernetes cluster with EC2 worker nodes using Amazon EKS and CDK. Implemented Infrastructure-as-Code to automate deployments.
        </p>
      </div>
    </section>
  );
}
