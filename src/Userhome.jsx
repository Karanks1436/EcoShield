// UserHome.jsx
import React, { useEffect, useState } from "react";
import "./UserHome.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function UserHome() {
  const [user, setUser] = useState({ email: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.email) {
      setUser(storedUser);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="userhome-wrapper">
        {/* Hero Section */}
        <header className="hero-section">
          <h1 className="hero-title">
            🚀 Welcome to <span>EcoShield</span>
          </h1>
          <p className="hero-subtitle">
            Your Digital Shield Against Cyber Threats
          </p>
          {user.email && (
            <p className="hero-email">🔑 Logged in as: {user.email}</p>
          )}
        </header>

        {/* Vision */}
        <section className="info-card wide">
          <h2>🌐 Our Vision</h2>
          <p>
            At <strong>EcoShield</strong>, we believe cybersecurity is a basic
            right. Our vision is to build a <span>global community</span> where
            every user — from beginners to experts — can feel safe online
            without needing technical expertise.
          </p>
        </section>

       

        {/* Features */}
        <div className="cards-grid">
          <section className="info-card">
            <h2>⚡ Features</h2>
            <ul>
              <li>📖 Easy-to-follow security guides</li>
              <li>🔐 Permission safety awareness</li>
              <li>📊 Latest digital security practices</li>
              <li>💡 Smart tips to avoid scams</li>
              <li>🌐 Community-driven safety knowledge</li>
            </ul>
          </section>

          <section className="info-card">
            <h2>🛡 Security Highlights</h2>
            <p>
              Learn how to spot phishing emails, detect malware, and protect
              your identity. We keep you updated with the latest cyberattack
              trends and provide real-time tips.
            </p>
          </section>

          <section className="info-card">
            <h2>🌟 Benefits</h2>
            <ul>
              <li>✅ Secure your accounts & data</li>
              <li>✅ Learn safe browsing habits</li>
              <li>✅ Stay updated on cyber threats</li>
              <li>✅ Join a like-minded community</li>
            </ul>
          </section>
        </div>
      
       {/* Call to Action */}
        <footer className="cta-section">
          <h2>💡 Stay Informed, Stay Safe</h2>
          <p>
            Explore our guides, follow the steps, and share with others. Together,
            we can build a secure digital community.
          </p>
        </footer>
      </div>
      <Footer/>
    </>
  );
}
