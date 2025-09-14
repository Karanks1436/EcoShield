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
              <li>Implement strong encryption for environmental data security.</li>
              <li>Detect and prevent cyber threats to sensitive data.</li>
              <li>Monitor environmental data systems for vulnerabilities.</li>
              <li>Ensure the integrity of climate research and wildlife.</li>
              <li>Implement AI for real-time threat detection.</li>
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

        {/* Best Practices */}
        <section className="info-card wide">
          <h2>📝 Best Practices for Cybersecurity</h2>
          <ul>
            <li>Use multi-factor authentication for all accounts.</li>
            <li>Regularly update software and operating systems.</li>
            <li>Encrypt sensitive files and communications.</li>
            <li>Regularly back up important data securely.</li>
            <li>Monitor access logs for unusual activity.</li>
          </ul>
        </section>

        {/* How-To Guides */}
        <section className="info-card wide">
          <h2>📘 How-To Guides</h2>
          <p>
            Step-by-step tutorials for beginners and professionals to:
          </p>
          <ul>
            <li>Secure your personal devices and networks.</li>
            <li>Detect and remove malware efficiently.</li>
            <li>Protect sensitive environmental and research data.</li>
            <li>Use open-source cybersecurity tools effectively.</li>
            <li>Respond to cyber incidents and breaches responsibly.</li>
          </ul>
        </section>

        {/* Tools & Resources */}
        <section className="info-card wide">
          <h2>🛠 Recommended Tools & Resources</h2>
          <ul>
            <li>Security monitoring platforms for organizations.</li>
            <li>Data encryption tools for personal and professional use.</li>
            <li>Cyber threat intelligence platforms for environmental data.</li>
            <li>Educational resources and courses on cybersecurity.</li>
            <li>Community forums for safe knowledge sharing.</li>
          </ul>
        </section>

        {/* Case Studies */}
        <section className="info-card wide">
          <h2>📊 Real-World Case Studies</h2>
          <p>
            Explore actual scenarios where cybersecurity played a crucial role:
          </p>
          <ul>
            <li>Preventing ransomware attacks on research institutions.</li>
            <li>Securing wildlife monitoring data from cyber threats.</li>
            <li>Protecting climate sensors and IoT devices in field research.</li>
            <li>Implementing AI-driven anomaly detection for environmental systems.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <footer className="cta-section">
          <h2>💡 Stay Informed, Stay Safe</h2>
          <p>
            Explore our guides, follow the steps, and protect your digital world.
            Together, we can build a secure and safe online community.
          </p>
        </footer>
      </div>
      <Footer />
    </>
  );
}
