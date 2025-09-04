import React from "react";
import { FaLinkedin } from "react-icons/fa"; // react-icons for social icons

export default function Footer() {
  const footerStyle = {
    backgroundColor: "#000",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px 20px",
    width:"100%",
    flexWrap: "wrap",
    fontFamily: "Arial, sans-serif",
  };

  const sectionStyle = {
    flex: "1",
    textAlign: "center",
    minWidth: "150px",
    margin: "10px 0",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    display: "block",
    margin: "5px 0",
    cursor: "pointer",
  };

  const socialIconsStyle = {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <footer style={footerStyle}>
      {/* Left Section */}
      <div style={{ ...sectionStyle, textAlign: "left" }}>
        <h2>Eco Shield</h2>
        <p>All Rights Reserved, 2025</p>
      </div>


      {/* Right Section */}
      <div style={{ ...sectionStyle, textAlign: "right" }}>
        
        <div style={socialIconsStyle}>
        <img src="ecoshieldlogo.jpeg" alt="" className="rounded-circle w-25"/>
        </div>
      </div>
      
      {/* Center Section */}
      <div style={sectionStyle}>
        <a href="/" style={linkStyle}>Index Page</a>
        <a href="/about" style={linkStyle}>About</a>
        <a href="/services" style={linkStyle}>Services</a>
        <a href="/contact" style={linkStyle}>Contact</a>
      </div>
    </footer>
  );
}
