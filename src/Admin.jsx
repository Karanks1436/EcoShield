import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function AdminDash() {
  const [user, setUser] = useState(null);
  const [loggedInUsers, setLoggedInUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [filter, setFilter] = useState("all");
  const itemsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.email !== "eco.shield.0001@gmail.com") {
      navigate("/");
    } else {
      setUser(storedUser);
    }

    const users = JSON.parse(localStorage.getItem("loggedInUsers")) || [];
    setLoggedInUsers(users);
  }, [navigate]);

  useEffect(() => {
    let users = [...loggedInUsers];

    if (filter === "blocked") {
      users = users.filter((u) => u.status === "Blocked");
    } else if (filter === "deleted") {
      users = users.filter((u) => u.deleted === true);
    } else {
      users = users.filter((u) => !u.deleted);
    }

    if (searchEmail) {
      users = users.filter((u) =>
        u.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    }

    if (sortBy === "name") {
      users.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "date") {
      users.sort(
        (a, b) => new Date(b.signupDate) - new Date(a.signupDate)
      );
    }

    setFilteredUsers(users);
    setCurrentPage(1);
  }, [loggedInUsers, searchEmail, sortBy, filter]);

  const handleToggleBlock = (email) => {
    const action = loggedInUsers.find((u) => u.email === email).status === "Blocked" ? "Resume" : "Block";

    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      const updatedUsers = loggedInUsers.map((u) =>
        u.email === email
          ? { ...u, status: u.status === "Blocked" ? "Active" : "Blocked" }
          : u
      );
      setLoggedInUsers(updatedUsers);
      localStorage.setItem("loggedInUsers", JSON.stringify(updatedUsers));
    }
  };

  const handleDelete = (email) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      const updatedUsers = loggedInUsers.map((u) =>
        u.email === email ? { ...u, deleted: true } : u
      );
      setLoggedInUsers(updatedUsers);
      localStorage.setItem("loggedInUsers", JSON.stringify(updatedUsers));
    }
  };

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
        {user && <h3 style={{ marginBottom: "30px" }}>Welcome, {user.name}</h3>}

        <input
          type="text"
          placeholder="🔍 Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          style={styles.searchInput}
        />

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.length > 0 ? (
              displayedUsers.map((u, index) => (
                <tr key={index}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      style={{
                        color: u.status === "Blocked" ? "#ff4d4d" : "#00e676",
                        fontWeight: "bold",
                      }}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <button
                      style={styles.blockBtn}
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={styles.sortFilter}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.select}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="date">Signup Date</option>
          </select>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Users</option>
            <option value="blocked">Blocked</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>

        <div style={styles.pagination}>
          <button
            style={styles.pageBtn}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            ◀ Previous
          </button>
          <span style={{ color: "#fff", fontWeight: "bold" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            style={styles.pageBtn}
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next ▶
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
    padding: "40px",
    background: "#121212",
    color: "#ffffff",
    minHeight: "100vh",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "#0f0",
  },
  searchInput: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #0f0",
    background: "#1e1e1e",
    color: "#0f0",
    width: "100%",
    maxWidth: "400px",
    marginBottom: "20px",
    fontSize: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#1e1e1e",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "20px",
  },
  blockBtn: {
    padding: "6px 14px",
    marginRight: "10px",
    background: "#ffa726",
    border: "none",
    borderRadius: "6px",
    color: "#000",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteBtn: {
    padding: "6px 14px",
    background: "#ff1744",
    border: "none",
    borderRadius: "6px",
    color: "#000",
    cursor: "pointer",
    fontWeight: "bold",
  },
  sortFilter: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },
  select: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #0f0",
    background: "#1e1e1e",
    color: "#0f0",
    fontWeight: "bold",
    minWidth: "160px",
    fontSize: "16px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    marginBottom: "30px",
  },
  pageBtn: {
    padding: "10px 20px",
    background: "#0f0",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  logoutBtn: {
    padding: "14px 28px",
    background: "#d50000",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
};
