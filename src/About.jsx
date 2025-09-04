import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import teamMembers from "./TeamData";
import "./App.css";

export default function AboutUs() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextMember = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevMember = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? teamMembers.length - 1 : prev - 1
    );
  };

  return (
    <div id="about" className="aboutus-section text-center py-5">
      {/* Title */}
      <motion.h2
        className="fw-bold mb-5 text-success"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ABOUT US
      </motion.h2>

      <div className="container">
        <div className="row align-items-center justify-content-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={teamMembers[currentIndex].name}
              className="col-lg-10 d-flex flex-column flex-md-row align-items-center glass-card p-4 shadow-lg rounded-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
            >
              {/* Left side - Image */}
              <motion.img
                src={teamMembers[currentIndex].img}
                alt={teamMembers[currentIndex].name}
                className="rounded-circle border border-4 border-success shadow-lg mb-4 mb-md-0"
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "cover",
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              />

              {/* Right side - Content */}
              <div className="ms-md-5 text-center text-md-start">
                <h3
                  className="fw-bold mb-3"
                  style={{
                    background: "linear-gradient(90deg, #00ff88, #00bfff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {teamMembers[currentIndex].name}
                </h3>
                <a
                  className="github-handle text-success d-block mb-2 fs-5"
                  href={teamMembers[currentIndex].github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{teamMembers[currentIndex].github.replace(
                    "https://github.com/",
                    ""
                  )}
                </a>
                <p className="role text-light fs-6">
                  {teamMembers[currentIndex].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-success mx-2 px-4"
            onClick={prevMember}
          >
            ◀ Prev
          </button>
          <button
            className="btn btn-outline-success mx-2 px-4"
            onClick={nextMember}
          >
            Next ▶
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="d-flex justify-content-center mt-3">
          {teamMembers.map((_, idx) => (
            <motion.div
              key={idx}
              className={`mx-1 rounded-circle ${
                idx === currentIndex ? "bg-success" : "bg-secondary"
              }`}
              style={{ width: 12, height: 12 }}
              animate={{
                scale: idx === currentIndex ? 1.3 : 1,
                opacity: idx === currentIndex ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
