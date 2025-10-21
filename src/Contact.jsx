import React from "react";
import { motion } from "framer-motion";
import "./App.css";

export default function Contact() {
  return (
    <div id="contact" className="contact-page py-5 position-relative">
      {/* Title */}
      <motion.h1
        className="metalicgold mb-5 text-center"
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
                whileFocus={{ scale: 1.02, borderColor: "#014D4E" }}
              />
              <motion.input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                whileFocus={{ scale: 1.02, borderColor: "#014D4E" }}
              />
              <motion.textarea
                className="form-control mb-3"
                rows="4"
                placeholder="Message"
                whileFocus={{ scale: 1.02, borderColor: "#014D4E" }}
              />
              <motion.a
  href="mailto:Eco.shield.0001@gmail.com"   // opens email client
  className="btn btn-neon border-secondary w-100 text-center text-secondary d-block"
  whileHover={{ scale: 1.05, boxShadow: "0 0 20px #014D4E" }}
  whileTap={{ scale: 0.95 }}
>
  SEND
</motion.a>

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
              <h4 className="metalicgold text-center mb-3">Contact Info</h4>
              <p className="emarld fw-bold">
                <i className="bi bi-telephone text-neon me-2"></i> +91 9041429065
              </p>
              <p className="emarld fw-bold">
                <i className="bi bi-envelope text-neon me-2"></i> Eco.shield.0001@gmail.com
              </p>
              <p className="emarld fw-bold">
                <i className="bi bi-geo-alt text-neon me-2"></i> Bathinda, Punjab, India
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
