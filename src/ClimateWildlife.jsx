import React from "react";
import Navbar from "./Navbar";

export default function ClimateWildlife() {
  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.heading}>🌿 Climate & Wildlife Conservation</h1>
        <p style={styles.subheading}>
          Ensuring the integrity of climate research and protecting wildlife for a sustainable future.
        </p>

        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <h2 style={styles.cardHeading}>🌎 Climate Research</h2>
            <p style={styles.cardText}>
              Conducting accurate and transparent climate research is vital for understanding global changes. We focus on reliable data collection, analysis, and reporting to combat climate change effectively.
            </p>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardHeading}>🦁 Wildlife Protection</h2>
            <p style={styles.cardText}>
              Protecting biodiversity and endangered species is crucial. Our initiatives include habitat conservation, anti-poaching measures, and community awareness programs.
            </p>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardHeading}>📊 Awareness & Education</h2>
            <p style={styles.cardText}>
              Educating communities and policymakers about climate impacts and wildlife preservation ensures a long-lasting positive effect on our planet.
            </p>
          </div>
        </div>

        <div style={styles.imageSection}>
          <img 
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1350&q=80" 
            alt="Wildlife & Climate" 
            style={styles.image} 
          />
        </div>

        <div style={styles.footerText}>
          <p>
            Join us in our mission to maintain the integrity of climate research and preserve wildlife for generations to come.
          </p>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    background: "#0d0d0d",
    color: "#ffffff",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  heading: {
    fontSize: "36px",
    color: "green",
    marginBottom: "10px",
  },
  subheading: {
    fontSize: "20px",
    color: "white",
    marginBottom: "40px",
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "50px",
  },
  card: {
    background: "#1a1a1a",
    border: "2px solid green",
    borderRadius: "12px",
    padding: "20px",
    width: "300px",
    boxShadow: "0 0 20px green",
    transition: "transform 0.3s",
  },
  cardHeading: {
    color: "green",
    marginBottom: "10px",
    fontSize: "22px",
  },
  cardText: {
    fontSize: "16px",
    color: "#d0ffd0",
    lineHeight: "1.6",
  },
  imageSection: {
    marginBottom: "40px",
  },
  image: {
    width: "90%",
    maxWidth: "800px",
    borderRadius: "15px",
    boxShadow: "0 0 20px green",
  },
  footerText: {
    fontSize: "18px",
    color: "green",
  },
};
