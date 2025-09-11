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

        {/* Stats */}
        <section className="stats-section">
          <div className="stat-box">
            <h3>50K+</h3>
            <p>Users Protected</p>
          </div>
          <div className="stat-box">
            <h3>200+</h3>
            <p>Cybersecurity Guides</p>
          </div>
          <div className="stat-box">
            <h3>99.9%</h3>
            <p>Threat Awareness Accuracy</p>
          </div>
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

        {/* Testimonials */}
        <section className="testimonials">
          <h2>💬 What Our Users Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial">
              <p>
                “EcoShield helped me understand how to protect my online
                banking. Clear and simple guides!”
              </p>
              <span>- Priya, Student</span>
            </div>
            <div className="testimonial">
              <p>
                “Our team uses EcoShield resources to train employees on
                phishing awareness. Very effective!”
              </p>
              <span>- Rahul, IT Manager</span>
            </div>
            <div className="testimonial">
              <p>
                “Finally, a cybersecurity site that doesn’t overwhelm beginners
                with jargon. Love it!”
              </p>
              <span>- Ananya, Freelancer</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section">
          <h2>❓ Frequently Asked Questions</h2>
          <details>
            <summary>Is EcoShield free to use?</summary>
            <p>Yes! All guides and resources are 100% free.</p>
          </details>
          <details>
            <summary>Can I contribute to EcoShield?</summary>
            <p>
              Absolutely! Join our community and share your knowledge to help
              others stay safe.
            </p>
          </details>
          <details>
            <summary>Do I need technical skills?</summary>
            <p>No, we focus on simplicity. Anyone can follow our steps.</p>
          </details>
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
      <Footer/>
    </>
  );
}
