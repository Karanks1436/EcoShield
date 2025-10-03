import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function AntivirusProtection() {
  const antivirusSites = [
    {
      name: "Kaspersky(*Recomended)",
      url: "https://www.kaspersky.com",
      desc: "Trusted cybersecurity solutions for home and business.",
    },
    {
      name: "Norton",
      url: "https://us.norton.com",
      desc: "Powerful antivirus and identity protection.",
    },
    {
      name: "McAfee",
      url: "https://www.mcafee.com",
      desc: "Comprehensive online security for devices and data.",
    },
    {
      name: "Avast",
      url: "https://www.avast.com",
      desc: "Free and premium antivirus with modern protection.",
    },
    {
      name: "Bitdefender",
      url: "https://www.bitdefender.com",
      desc: "Award-winning antivirus and cybersecurity solutions.",
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="antivirus-page py-5 bg-black text-light position-relative">
      <style>{`
        .antivirus-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          min-height: 100vh;
        }
        .page-title {
          background: linear-gradient(90deg, green, green);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
          font-size: 2.8rem;
          letter-spacing: 1px;
          text-shadow: 0 0 10px rgba(0, 255, 100, 0.2);
        }
        .page-subtitle {
          color: #bbb;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          padding: 20px;
        }
        .glass-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 28px rgba(0, 255, 80, 0.15);
        }
        .card-title {
          color: green;
          font-size: 1.35rem;
          margin-bottom: 10px;
        }
        .card-text {
          font-size: 0.95rem;
          color: #ccc;
          line-height: 1.5;
        }
        .btn-dark-theme {
          background: linear-gradient(90deg, green , green);
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          transition: all 0.3s ease;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          box-shadow: 0 3px 10px green;
        }
        .btn-dark-theme:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 255, 80, 0.35);
          opacity: 0.95;
        }
      `}</style>

      {/* Title */}
      <motion.h1
        className="text-center page-title mb-2"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🔒 Antivirus Protection
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-center page-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        ✅ Verified Antivirus Shields – Stay Safe, Stay Protected
      </motion.p>

      {/* Cards */}
      <div className="container">
        <div className="row g-4">
          {antivirusSites.map((site, index) => (
            <motion.div
              key={index}
              className="col-md-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card glass-card h-100 border-0 text-center">
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title fw-bold">{site.name}</h4>
                  <p className="card-text flex-grow-1">{site.desc}</p>
                  <motion.a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dark-theme mt-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Visit Site
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
