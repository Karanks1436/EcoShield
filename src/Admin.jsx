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
  const itemsPerPage = 20;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://eco-shield-backend.onrender.com/dashboard");
      const data = await res.json();
      // Map backend data to expected fields
      const mapped = data.map(u => ({
        ...u,
        status: u.is_active === 1 ? "Active" : "Blocked",
      }));
      setAllUsers(mapped);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.email !== "eco.shield.0001@gmail.com") {
      navigate("/");
    } else {
      setUser(storedUser);
      fetchUsers();
    }
  }, [navigate]);

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

  const handleToggleBlock = async (email) => {
    if (window.confirm("Are you sure you want to change this user's status?")) {
      await fetch(`https://eco-shield-backend.onrender.com/users/${email}/block`, {
        method: "PUT",
      });
      fetchUsers();
    }
  };

  const handleDelete = async (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await fetch(`https://eco-shield-backend.onrender.com/users/${email}`, {
        method: "DELETE",
      });
      fetchUsers();
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((u, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.contact}</td>
                <td style={{color:u.status==="Blocked"?"#ff4d4d":"#00e676",fontWeight:"bold"}}>{u.status}</td>
                <td>
                  <button style={styles.blockBtn} onClick={() => handleToggleBlock(u.email)}>
                    {u.status === "Blocked" ? "Resume" : "Block"}
                  </button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(u.email)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
</div>
        <div style={styles.pagination}>
          <button disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)}>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(p=>p+1)}>Next</button>
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}
const styles = {
  container: {
    padding: "40px",
    background: "#0d0d0d",
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
  },
  searchInput: {
    padding: "14px",
    borderRadius: "12px",
    border: "2px solid #00ff99",
    background: "#1a1a1a",
    color: "#00ff99",
    width: "100%",
    maxWidth: "450px",
    marginBottom: "30px",
    fontSize: "17px",
    outline: "none",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0, 255, 153, 0.2)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "700px",
  },
  th: {
    background: "#00ff99",
    color: "#000",
    padding: "18px",
    fontSize: "18px",
    textAlign: "left",
    fontWeight: "bold",
    position: "sticky",
    top: 0,
  },
  // 🌈 pastel neon stripes for easy reading
  trColors: [
    { backgroundColor: "#1e1e2e" },
    { backgroundColor: "#1b2a3a" },
    { backgroundColor: "#1a3a2e" },
    { backgroundColor: "#2a1e2e" },
    { backgroundColor: "#2a2e1e" },
  ],
  td: {
    padding: "18px",
    fontSize: "16px",
    borderBottom: "1px solid #333",
  },
  blockBtn: {
    padding: "8px 16px",
    marginRight: "10px",
    background: "#ffca28",
    border: "none",
    borderRadius: "8px",
    color: "#000",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "transform 0.2s, background 0.2s",
  },
  deleteBtn: {
    padding: "8px 16px",
    background: "#ff5252",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "transform 0.2s, background 0.2s",
  },
  buttonHover: {
    transform: "scale(1.05)",
    filter: "brightness(1.1)",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    marginTop: "30px",
  },
  pageBtn: {
    padding: "10px 22px",
    background: "#00ff99",
    color: "#000",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
  logoutBtn: {
    padding: "16px 32px",
    background: "#d50000",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "18px",
  },
};
