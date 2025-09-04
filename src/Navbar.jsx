import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // If you want to redirect after logout

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Example: clear user session
    localStorage.removeItem("user"); 
    // Redirect to login page
    navigate("/");
  };

  return (
    <>
      <style>{`
        /* Navbar Styles */
        .navbar {
          width: 100%;
          background: #000;
          color: #00cc66;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 1%;
          border-bottom: 1px solid #003d1f;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .nav-logo {
          font-size: 1.5rem;
          font-weight: 600;
          color: #00cc66;
          letter-spacing: 1px;
        }

        .nav-links {
          display: flex;
          gap: 28px;
          list-style: none;
          transition: all 0.3s ease;
        }

        .nav-links li a {
          color: #cceede;
          text-decoration: none;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .nav-links li a:hover {
          color: #00cc66;
        }

        .logout-btn {
          cursor: pointer;
          color: #ff4d4d;
          font-weight: 500;
          border: none;
          background: none;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .logout-btn:hover {
          color: #ff0000;
        }

        /* Hamburger Icon */
        .nav-toggle {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 5px;
        }

        .nav-toggle span {
          height: 3px;
          width: 24px;
          background: #00cc66;
          border-radius: 2px;
          transition: 0.3s;
        }

        .nav-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translateY(8px);
        }

        .nav-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .nav-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translateY(-8px);
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .nav-links {
            position: absolute;
            top: 65px;
            right: 0;
            height: calc(100vh - 65px);
            width: 200px;
            flex-direction: column;
            align-items: start;
            background: #0d0d0d;
            padding: 20px;
            gap: 20px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
          }
          .nav-links.open {
            transform: translateX(0);
          }
          .nav-toggle {
            display: flex;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="nav-logo">
          <img src="ecoshieldlogo.jpeg" alt="" className="rounded-circle" width={50} />
          EcoShield
        </div>

        {/* Hamburger Menu */}
        <div
          className={`nav-toggle ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Nav Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><a href="/userhome">Home</a></li>
          <li><a href="/scan">Scan</a></li>
          <li><a href="hack-preventions">Preventive Measures</a></li>
          <li><a href="/scam-reports">Possible Scams</a></li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
