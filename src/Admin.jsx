import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function AdminDash() {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [filter, setFilter] = useState("all");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://eco-shield-backend-0bdn.onrender.com/dashboard");
      const data = await res.json();
      const mapped = data.map(u => ({
        name: u.name,
        email: u.email,
        contact: u.contact,
        status: u.is_active === 1 ? "Active" : "Blocked",
      }));

      // ✅ Always keep admin on top
      const sorted = mapped.sort((a, b) => {
        if (a.email === "eco.shield.0001@gmail.com") return -1;
        if (b.email === "eco.shield.0001@gmail.com") return 1;
        return a.name.localeCompare(b.name);
      });

      setAllUsers(sorted);
    } catch (err) {
      console.error("Error fetching users", err);
      alert("Failed to fetch users");
    }
  };

  // Delete user by email
  const handleDelete = async (email) => {
    if (!email) {
      alert("Email not found!");
      return;
    }

    if (email === "eco.shield.0001@gmail.com") {
      alert("You cannot delete the main Admin!");
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${email}?`)) {
      try {
        setLoading(true);
        const res = await fetch(`https://eco-shield-backend-0bdn.onrender.com/api/users/${email}`, {
          method: "DELETE",
        });
        const data = await res.json();
        console.log("Delete response:", data);

        if (res.ok) {
          alert(`User ${email} deleted successfully`);
          fetchUsers();
        } else {
          alert(`Failed to delete user: ${data.message || "Unknown error"}`);
        }
      } catch (err) {
        console.error("Error deleting user", err);
        alert("Error deleting user");
      } finally {
        setLoading(false);
      }
    }
  };

  // Check admin login
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.email !== "eco.shield.0001@gmail.com") {
      navigate("/");
    } else {
      setUser(storedUser);
      fetchUsers();
    }
  }, [navigate]);

  // Filter, search, sort
  useEffect(() => {
    let users = [...allUsers];

    if (filter === "blocked") {
      users = users.filter((u) => u.status === "Blocked");
    }

    if (searchEmail) {
      users = users.filter((u) =>
        u.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }

    if (sortBy === "name") {
      users.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredUsers(users);
    setCurrentPage(1);
  }, [allUsers, searchEmail, sortBy, filter]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.heading}>🌿 Eco Shield - Admin Dashboard</h1>
        {user && <h3>Welcome, {user.email}</h3>}

        <input
          type="text"
          placeholder="🔍 Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          style={styles.searchInput}
        />

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.map((u, index) => (
                <tr
                  key={u.email}
                  style={styles.trColors[index % styles.trColors.length]}
                >
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.contact}</td>
                  <td>
                    {u.email === "eco.shield.0001@gmail.com" ? (
                      <span style={{ color: "#00ff99", fontWeight: "bold" }}>
                        Admin
                      </span>
                    ) : (
                      <button
                        style={{
                          ...styles.deleteBtn,
                          opacity: loading ? 0.6 : 1,
                        }}
                        onClick={() => handleDelete(u.email)}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    background: "linear-gradient(135deg, #0d0d0d, #11141a)",
    color: "#ffffff",
    minHeight: "100vh",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "36px",
    marginBottom: "30px",
    color: "#00ff99",
    letterSpacing: "1px",
    textShadow: "0 0 10px #00ff99",
  },
  searchInput: {
    padding: "14px 18px",
    borderRadius: "14px",
    border: "2px solid #00ff99",
    background: "#1a1a1a",
    color: "#00ff99",
    width: "100%",
    maxWidth: "450px",
    marginBottom: "30px",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.3s ease",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "14px",
    boxShadow: "0 0 20px rgba(0, 255, 153, 0.2)",
    marginBottom: "30px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "720px",
  },
  trColors: [
    { backgroundColor: "#1e1e2e" },
    { backgroundColor: "#1b2a3a" },
    { backgroundColor: "#1a3a2e" },
    { backgroundColor: "#2a1e2e" },
    { backgroundColor: "#2a2e1e" },
  ],
  deleteBtn: {
    padding: "10px 20px",
    background: "#ff5252",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    marginTop: "30px",
    flexWrap: "wrap",
  },
  logoutBtn: {
    padding: "16px 32px",
    background: "#d50000",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "all 0.3s ease",
  },
};
