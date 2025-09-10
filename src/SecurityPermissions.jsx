import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SecurityPermissions.css";

export default function SecurityPermissions() {
  const [permissions, setPermissions] = useState({
    gallery: false,
    contacts: false,
    sms: false,
    notifications: false,
    files: false,
    apps: false,
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPerms = JSON.parse(localStorage.getItem("permissions"));
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedPerms) setPermissions(storedPerms);
    if (storedUser) setUser(storedUser);
  }, []);

  const handlePermission = (key) => {
    const updated = {
      ...permissions,
      [key]: !permissions[key],
    };
    setPermissions(updated);
    localStorage.setItem("permissions", JSON.stringify(updated));
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveUser = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditing(false);
  };

  // Check if all permissions are enabled
  const allPermissionsGranted = Object.values(permissions).every((val) => val);

  return (
    <div className="userhome-container">
      <div className="content-box">
        <h1 className="title">🔒 Security Permissions</h1>
        <p className="subtitle">
          Manage your details and allow permissions to protect against threats.
        </p>

        {/* User Info Section */}
        <div className="user-card">
          {(!user.name || editing) ? (
            <div className="user-form">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Enter your contact number"
                value={user.phone}
                onChange={handleChange}
              />
              <button className="save-btn" onClick={saveUser}>
                Save Details
              </button>
            </div>
          ) : (
            <div className="user-details">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Contact:</strong> {user.phone}</p>
              <button className="edit-btn" onClick={() => setEditing(true)}>
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Permissions Section */}
        <div className="permissions-list">
          {Object.keys(permissions).map((key) => (
            <div key={key} className="permission-item">
              <span className="perm-label">{key}</span>
              <div
                className={`toggle ${permissions[key] ? "active" : ""}`}
                onClick={() => handlePermission(key)}
              >
                <div className="circle"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Show Scan Option if all permissions granted */}
        {allPermissionsGranted && (
          <button
            className="scan-btn"
            // onClick={() => navigate("/user")}
            
          >
            <a href="https://www.imei.info/">🚀 Start Scan</a>
          </button>
        )}
      </div>
    </div>
  );
}
