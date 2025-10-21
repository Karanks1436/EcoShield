import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        body { background: rgba(0, 0, 0, 1); margin: 0; font-family: Arial, sans-serif; }

        .navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.19); /* semi-transparent white */
  backdrop-filter: blur(35px); /* glass blur effect */
  -webkit-backdrop-filter: blur(35px); /* Safari support */
  border: 1px solid rgba(255, 255, 255, 0.25); /* soft border for glass look */
  padding: 1rem 2%;
  border-radius: 12px;
  margin: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); /* subtle shadow */
  color: #222; /* dark text for contrast */
  position: relative;
  top: 10px;
  z-index: 1000;
  flex-wrap: wrap;
  transition: all 0.3s ease;
}


        .nav-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: bold;
          font-size: 1.75rem;
          color: #D4AF37;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .nav-logo img {
          width: 45px;
          height: 45px;
          transition: transform 0.5s ease;
        }

        .nav-logo:hover img {
          transform: rotate(360deg);
        }

        .nav-links {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .nav-links a {
          color: #D4AF37;
          text-decoration: none;
          font-size: 1rem;
          padding: 0.5rem 0.8rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .nav-links a.active {
          background: rgb(220,245,255);
          color: rgba(0, 204, 34, 1);
        }

        .dropdown {
          position: relative;
        }

        .dropdown-toggle {
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          background:#014D4E;
          color:#D4AF37;
          transition: 0.2s ease;
        }

        .dropdown-toggle:hover {
          background:#D4AF37;
          color:black;
        }

        .dropdown-menu {
          display: none;
          position: absolute;
          top: 120%;
          right: 0;
          background: #D4AF37;
          color: #014D4E;
          border-radius: 8px;
          min-width: 160px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          flex-direction: column;
          padding: 0.5rem 0;
          z-index: 2000;
        }

        .dropdown.open .dropdown-menu {
          display: flex;
        }
          
        .dropdown-menu2 {
          display: none;
          position: absolute;
          top: 120%;
          right: 0;
          background: rgba(0, 0, 0, 1);
          color: rgb(33,33,33);
          border-radius: 8px;
          min-width: 160px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          flex-direction: column;
          padding: 0.5rem 0;
          z-index: 2000;
        }

        .dropdown.open .dropdown-menu2 {
          display: flex;
        }

        .dropdown-menu a, .dropdown-menu button {
          display: block;
          padding: 0.6rem 1rem;
          color: rgb(33,33,33);
          text-decoration: none;
          font-size: 0.95rem;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
        }

        .dropdown-menu2 a, .dropdown-menu2 button {
          display: block;
          padding: 0.6rem 1rem;
          color: rgba(255, 251, 251, 1);
          text-decoration: none;
          font-size: 0.95rem;
          background: black;
          border: none;
          text-align: left;
          cursor: pointer;
        }

        .dropdown-menu a:hover, .dropdown-menu button:hover {
          background: rgb(220,245,255);
          color: rgba(0, 204, 37, 1);
        }
          .dropdown-menu2 a:hover, .dropdown-menu2 button:hover {
          background: rgba(255, 255, 255, 1);
          color: rgba(0, 0, 0, 1);
        }

        .user-dropdown2 {
          margin-left: auto;
          display: flex;
          align-items: center;
        }

        .btn-logout {
          background: red;
          border: none;
          color: white;
          font-weight: bold;
          padding: 0.5rem 1.2rem;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .btn-logout:hover {
          background: rgb(200,35,50);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 4px;
        }

        .hamburger span {
          width: 25px;
          height: 3px;
          background: rgba(255, 255, 255, 1);
          border-radius: 2px;
        }

        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .nav-links {
            display: ${menuOpen ? "flex" : "none"};
            flex-direction: column;
            width: 100%;
            margin-top: 1rem;
            gap: 0.5rem;
          }
          .nav-left { flex-direction: column; align-items: flex-start; width: 100%; }
          .user-dropdown { width: 100%; justify-content: flex-end; margin-top: 1rem; }
          .dropdown-menu { position: relative; top: 0; right: 0; }
        }
      `}</style>

      <nav className="navbar">
        <div className="nav-left">
          <div className="nav-logo" onClick={() => navigate("/userhome")}>
            <img src="/ecoshieldlogo.jpeg" className="rounded-circle" alt="Logo" />
            EcoShield
          </div>

          <div className="hamburger" onClick={() => setMenuOpen(prev => !prev)}>
            <span></span>
            <span></span>
            <span></span>
            
          </div>

          <div className="nav-links">
            <a href="/userhome" className={isActive("/userhome") ? "active" : ""}>🏠 Dashboard</a>
            <a href="/user" className={isActive("/user") ? "active" : ""}>📡 Scan</a>
            <a href="/scam-reports" className={isActive("/scam-reports") ? "active" : ""}>🚨 Scam Reports</a>

            <div className={`dropdown ${guideOpen ? "open" : ""}`}>
              <div className="dropdown-toggle" onClick={() => setGuideOpen(prev => !prev)}>Guide</div>
              <div className="dropdown-menu">
                <a href="/antivirus">Security Guide</a>
                <a href="/hack-preventions">Preventive Tips</a>
                <a href="/contact">Contact</a>
              </div>
            </div>
 <a href="/climate" className={isActive("/climate") ? "active" : ""}> Climate Research</a>
            {user && user.email === "eco.shield.0001@gmail.com" && (
              <a href="/admindash" className={isActive("/admindash") ? "active" : ""}>🧑‍💻 Admin</a>
            )}
          </div>
        </div>

        <div className={`user-dropdown dropdown ${settingsOpen ? "open" : ""}`}>
          <div className="dropdown-toggle" onClick={() => setSettingsOpen(prev => !prev)}>
            {user?.email || "User"}
          </div>
          <div className="dropdown-menu2">
            <a href="/profile">Profile</a>
            <button className="btn-logout bg-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </>
  );
}
