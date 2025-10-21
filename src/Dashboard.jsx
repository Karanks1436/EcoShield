import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import AlienLoader from "./AlienLoader"; // Import the loader
export default function Homepage() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (e.g., API or assets)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loader for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <AlienLoader />;

  return (
    <div className="homepage d-flex flex-column">
      {/* Navbar */}
     <nav className="navbar navbar-expand-lg navbar-dark bg-black px-4">
  <div className="container-fluid">
    <a className="navbar-brand fw-bold txtgreen fs-3" href="#home">
      Eco Shield
    </a>
    <button
      className="navbar-toggler tealbtn rounded"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"> </span>
    </button>

    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav text-center">
        <li className="nav-item mx-2 my-1">
          <a className="nav-link text-white fw-semibold" href="#home">Home</a>
        </li>
        <li className="nav-item mx-2 my-1">
          <a className="nav-link text-white fw-semibold" href="/about">About</a>
        </li>
        <li className="nav-item mx-2 my-1">
          <a className="nav-link text-white fw-semibold" href="/services">Services</a>
        </li>
        <li className="nav-item tealbtn rounded mx-2 my-1">
          <a className="nav-link tealbtn rounded metalicgold fw-semibold" href="/auth">Login/SignUp</a>
        </li>
      </ul>
    </div>
  </div>
</nav>


      {/* Hero Section */}
      <div
        id="home"
        className="flex-grow-1 d-flex flex-column p-5 flex-lg-row align-items-center justify-content-between hero-section bg-black"
        style={{ minHeight: "100vh" }}
      >
        {/* Left Content */}
        <div className="text-content text-center text-lg-start">
          <h1 className="fw-bold display-3 text-secondary mb-3">
            ECO <br /> <span className="teal">SHIELD</span>
          </h1>
          <p className="lead text-light fs-4">
            We protect your data and <br /> systems from hacks
          </p>
          <a href="/auth">
            <button className="tealbtn btn-lg mt-4 px-5 py-2 rounded-4 shadow">
              🚀 Get Started
            </button>
          </a>
        </div>

        {/* Right Side Illustration */}
        <div className="illustration mt-5 mt-lg-0 text-center">
          <img src="hackerlogo.png" alt="Illustration" />
        </div>
      </div>

      {/* How to Use Section */}
      <section id="how-to-use" className="py-5 bg-black text-light text-center">
        <div className="container">
          <h2 className="fw-bold metalicgold mb-4">How to Use Eco Shield</h2>
          <p className="lead fs-5">
            Getting started is simple. Just create an account, connect your
            systems, and let Eco Shield monitor for vulnerabilities in
            real-time. Our dashboard gives you live alerts and easy-to-follow
            guidance to fix threats before they cause damage.
          </p>
        </div>
      </section>

      {/* Why Eco Shield Section */}
      <section id="why-eco-shield" className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold metalicgold mb-4">Why Choose Eco Shield?</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="p-4 border rounded-4 bg-black text-light shadow-sm h-100">
                <h5 className="fw-bold emarld mb-2">🛡️ Advanced Protection</h5>
                <p className="mb-0">
                  Cutting-edge algorithms detect hacking attempts instantly.
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="p-4 border rounded-4 bg-black text-light shadow-sm h-100">
                <h5 className="fw-bold emarld mb-2">⚡ Lightning Fast</h5>
                <p className="mb-0">
                  Real-time alerts and auto-defense mechanisms to keep you safe.
                </p>
              </div>
            </div>
            {/* <div className="col-md-4 mb-4">
              <div className="p-4 border rounded-4 bg-black text-light shadow-sm h-100">
                <h5 className="fw-bold mb-2">🌍 Global Coverage</h5>
                <p className="mb-0">
                  Trusted by individuals and businesses across the world.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* What to Do if Hacked Section */}
      <section id="what-to-do" className="py-5 bg-black text-light">
        <div className="container text-center">
          <h2 className="fw-bold metalicgold mb-4">
            What to Do if You Got Hacked
          </h2>
          <p className="lead fs-5">
            Don’t panic. Eco Shield has your back. Immediately disconnect from
            the internet, run our quick scan, and follow the guided recovery
            steps. Our support team is available 24/7 to help you regain control
            of your system and secure your data.
          </p>
          <a href="/contact">
            <button className="tealbtn btn-lg mt-3 px-5 py-2 text-white rounded-4 shadow-sm">
              Get Help Now
            </button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-3 bg-black metalicgold small">
        © {new Date().getFullYear()} Eco Shield. All rights reserved.
      </footer>
    </div>
  );
}
