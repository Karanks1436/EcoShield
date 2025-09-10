import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function AdminDash() {
  const [user, setUser] = useState(null); // logged-in admin
  const [loggedInUsers, setLoggedInUsers] = useState([]); // all users
  const navigate = useNavigate();

  // ✅ Check admin + load users
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.email !== "hackeradmin@gmail.com") {
      navigate("/"); // 🚫 redirect non-admins
    } else {
      setUser(storedUser);
    }

    const users = JSON.parse(localStorage.getItem("loggedInUsers")) || [];
    setLoggedInUsers(users);
  }, [navigate]);

  // ✅ Toggle Block / Resume
  const handleToggleBlock = (email) => {
    const updatedUsers = loggedInUsers.map((u) =>
      u.email === email
        ? { ...u, status: u.status === "Blocked" ? "Active" : "Blocked" }
        : u
    );
    setLoggedInUsers(updatedUsers);
    localStorage.setItem("loggedInUsers", JSON.stringify(updatedUsers));
  };

  // ✅ Delete user
  const handleDelete = (email) => {
    const updatedUsers = loggedInUsers.filter((u) => u.email !== email);
    setLoggedInUsers(updatedUsers);
    localStorage.setItem("loggedInUsers", JSON.stringify(updatedUsers));
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
        <Navbar/>
    <div style={styles.container}>
      <h1 style={styles.heading}>👨‍💻 Eco Shield - Admin Dashboard</h1>
      {user && <h3>Welcome, {user.name}</h3>}

      <p style={{ marginTop: "20px" }}>
        ✅ Manage users below. You can block/resume or delete accounts.
      </p>

      {/* Users Section */}
      <div style={styles.userGrid}>
        {loggedInUsers.length > 0 ? (
          loggedInUsers.map((u, index) => (
            <div key={index} style={styles.card}>
              <h3>{u.name}</h3>
              <p>
                <b>Email:</b> {u.email}
              </p>
              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    color: u.status === "Blocked" ? "red" : "limegreen",
                    fontWeight: "bold",
                  }}
                >
                  {u.status || "Active"}
                </span>
              </p>
              <div style={styles.buttonRow}>
                <button
                  style={{
                    ...styles.blockBtn,
                    background: u.status === "Blocked" ? "green" : "orange",
                  }}
                  onClick={() => handleToggleBlock(u.email)}
                >
                  {u.status === "Blocked" ? "Resume" : "Block"}
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(u.email)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Logout */}
      <button style={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
    </>
  );
}

// 🎨 Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    background: "#111",
    color: "#0f0",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "15px",
  },
  userGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "30px",
    marginBottom: "50px",
  },
  card: {
    background: "#222",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    color: "#fff",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  blockBtn: {
    flex: 1,
    marginRight: "10px",
    padding: "8px",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    flex: 1,
    padding: "8px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  logoutBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
