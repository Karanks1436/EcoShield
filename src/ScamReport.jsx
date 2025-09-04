import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function ScamReport() {
  const [form, setForm] = useState({ title: "", details: "", image: "" });
  const [scams, setScams] = useState([]);
  const [user, setUser] = useState({ email: "" });

  // Load from localStorage
  useEffect(() => {
    const storedScams = JSON.parse(localStorage.getItem("scams")) || [];
    setScams(storedScams);

    // ✅ Get logged-in user from localStorage (same as UserHome.jsx)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.email) {
      setUser(storedUser);
    }
  }, []);

  // Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload (admin only)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Save scam report (admin only)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.details) return;

    const newScam = {
      id: Date.now(),
      title: form.title,
      details: form.details,
      image: form.image,
    };

    const updatedScams = [newScam, ...scams];
    setScams(updatedScams);
    localStorage.setItem("scams", JSON.stringify(updatedScams));
    setForm({ title: "", details: "", image: "" });
  };

  // Delete scam (admin only)
  const handleDelete = (id) => {
    const updatedScams = scams.filter((s) => s.id !== id);
    setScams(updatedScams);
    localStorage.setItem("scams", JSON.stringify(updatedScams));
  };

  return (
    <>
    <Navbar/>
    
    <div className="scam-container">
      {/* ✅ Display logged-in email */}
      {user.email && <div className="user-info">👤 {user.email}</div>}

      <h1 className="scam-title">🚨 Scam Reports</h1>

      {/* Admin-only form */}
      <form className="scam-form" onSubmit={handleSubmit}>
        {user.email === "hackeradmin@gmail.com" ? (
          <>
            <input
              type="text"
              name="title"
              placeholder="Enter scam title (e.g., Fake Bank SMS)"
              value={form.title}
              onChange={handleChange}
            />

            <textarea
              name="details"
              placeholder="Describe the scam details..."
              rows="4"
              value={form.details}
              onChange={handleChange}
            ></textarea>

            <input type="file" accept="image/*" onChange={handleImageUpload} />

            <button type="submit">Submit Report</button>
          </>
        ) : (
          <p className="readonly-msg">
            ⚠️ Only the admin can upload scams. You can view the reports below.
          </p>
        )}
      </form>

      {/* Scam Reports Section */}
      <div className="scam-list">
        {scams.length === 0 ? (
          <p>No scam reports available yet.</p>
        ) : (
          scams.map((scam) => (
            <div className="scam-item" key={scam.id}>
              <h3>{scam.title}</h3>
              <p>{scam.details}</p>
              {scam.image && <img src={scam.image} alt="scam evidence" />}
              {user.email === "hackeradmin@gmail.com" && (
                <button onClick={() => handleDelete(scam.id)}>Delete</button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Styles */}
      <style>{`
        .scam-container {
          min-height: 100vh;
          padding: 40px 10%;
          background: #111;
          color: #eee;
          font-family: "Segoe UI", sans-serif;
          position: relative;
        }
        .user-info {
          position: absolute;
          top: 20px;
          right: 10%;
          background: #222;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.95rem;
          color: #00cc66;
          border: 1px solid #333;
        }
        .scam-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }
        .scam-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          background: #1a1a1a;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 40px;
        }
        .scam-form input,
        .scam-form textarea {
          padding: 10px;
          border: 1px solid #444;
          border-radius: 6px;
          background: #000;
          color: #fff;
          font-size: 1rem;
        }
        .scam-form button {
          background: #00cc66;
          color: #fff;
          border: none;
          padding: 10px 15px;
          font-size: 1rem;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.3s;
        }
        .scam-form button:hover {
          background: #00994d;
        }
        .scam-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .scam-item {
          background: #1a1a1a;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #00cc66;
        }
        .scam-item h3 {
          margin: 0 0 8px;
          color: #00cc66;
        }
        .scam-item img {
          max-width: 200px;
          margin-top: 10px;
          border-radius: 6px;
          border: 1px solid #333;
        }
        .scam-item button {
          margin-top: 10px;
          background: #cc0033;
          color: #fff;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
        }
        .scam-item button:hover {
          background: #990026;
        }
        .readonly-msg {
          color: #ffcc00;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
    </>
  );
}
