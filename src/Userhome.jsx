// UserHome.jsx
import React, { useEffect, useState } from "react";
import "./UserHome.css";
import Navbar from "./Navbar";

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
        <Navbar/>
    <div className="userhome-wrapper">
      {/* Hero Section */}
      <header className="hero-section">
        <h1 className="hero-title">🚀 Welcome to EcoShield</h1>
        <p className="hero-subtitle">Your Digital Shield Against Threats</p>
        {user.email && (
          <p className="hero-email">🔑 Logged in as: {user.email}</p>
        )}
      </header>

      {/* Why Section */}
      <section className="info-section">
        <h2>🌍 Why We Created This Site</h2>
        <p>
          We built EcoShield to empower users with knowledge about digital
          threats. With cyberattacks growing every day, our goal is to make
          cybersecurity simple and accessible for everyone.
        </p>
      </section>

      {/* Purpose */}
      <section className="info-section">
        <h2>🎯 Our Purpose</h2>
        <p>
          To spread awareness about online risks and provide helpful resources
          that protect your privacy, data, and digital identity — all in one
          place.
        </p>
      </section>

      {/* How to Use */}
      <section className="info-section">
        <h2>🛠 How to Use (Step by Step)</h2>
        <ol>
          <li>Visit our knowledge sections on security tips.</li>
          <li>Learn how to secure your files, contacts, and accounts.</li>
          <li>Explore guides on permission safety and app security.</li>
          <li>Follow our best practices to stay protected online.</li>
        </ol>
      </section>

      {/* Features */}
      <section className="info-section">
        <h2>⚡ Features of EcoShield</h2>
        <ul>
          <li>📖 Easy-to-follow cybersecurity guides.</li>
          <li>🔐 Awareness about permission safety.</li>
          <li>📊 Latest digital security practices.</li>
          <li>💡 Smart tips to avoid online scams.</li>
          <li>🌐 Community-driven safety awareness.</li>
        </ul>
      </section>

      {/* Security Highlights */}
      <section className="info-section">
        <h2>🛡 Security Highlights</h2>
        <p>
          We cover key areas like phishing, malware, data privacy, and identity
          theft prevention. Our resources help you stay ahead of hackers with
          practical advice and updated information.
        </p>
      </section>

      {/* Benefits */}
      <section className="info-section">
        <h2>🌟 Benefits of Using EcoShield</h2>
        <ul>
          <li>✅ Knowledge to keep your accounts secure.</li>
          <li>✅ Awareness about hidden digital threats.</li>
          <li>✅ Learn safe digital habits for everyday use.</li>
          <li>✅ Protect personal data and online identity.</li>
        </ul>
      </section>

      {/* Motive */}
      <section className="info-section">
        <h2>🔥 Our Motive</h2>
        <p>
          Security should be simple, clear, and accessible to everyone. Our
          mission is to spread awareness, educate users, and build a safer
          digital world for all.
        </p>
      </section>

      {/* Call to Action */}
      <footer className="cta-section">
        <h2>💡 Stay Informed, Stay Safe</h2>
        <p>
          Explore our guides, follow the steps, and share with others. Together,
          we can build a secure digital community.
        </p>
      </footer>
    </div>
    </>
  );
}
