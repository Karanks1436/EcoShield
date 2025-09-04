import React from "react";
import { motion } from "framer-motion";
import "./App.css";

export default function Contact() {
  return (
    <div id="contact" className="contact-page py-5 position-relative">
      {/* Title */}
      <motion.h1
        className="text-neon mb-5 text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        GET IN TOUCH
      </motion.h1>

      <div className="container">
        <div className="row justify-content-center align-items-center">
          {/* Contact Form */}
          <motion.div
            className="col-md-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form className="contact-form glass-card p-4 rounded-4 shadow-lg">
              <motion.input
                type="text"
                className="form-control mb-3"
                placeholder="Name"
                whileFocus={{ scale: 1.02, borderColor: "#00ff88" }}
              />
              <motion.input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                whileFocus={{ scale: 1.02, borderColor: "#00ff88" }}
              />
              <motion.textarea
                className="form-control mb-3"
                rows="4"
                placeholder="Message"
                whileFocus={{ scale: 1.02, borderColor: "#00ff88" }}
              />
              <motion.button
                type="submit"
                className="btn btn-neon w-100"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px #00ff88" }}
                whileTap={{ scale: 0.95 }}
              >
                SEND
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="col-md-4 text-start mt-4 mt-md-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-4 rounded-4 shadow-lg">
              <h4 className="text-light mb-3">Contact Info</h4>
              <p className="text-success">
                <i className="bi bi-telephone text-neon me-2"></i> +91 1234567890
              </p>
              <p className="text-success">
                <i className="bi bi-envelope text-neon me-2"></i> Admin@gmail.com
              </p>
              <p className="text-success">
                <i className="bi bi-geo-alt text-neon me-2"></i> 1234 Street Name, City, State 12345
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Grid Background */}
      <div className="grid-bg"></div>
    </div>
  );
}
