import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

export default function LoginSignupCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupData, setSignupData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });

  const navigate = useNavigate();

  // ✅ Handle signup
  const handleSignup = (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check duplicate email
    if (existingUsers.some((u) => u.email === signupData.email)) {
      alert("User already exists with this email!");
      return;
    }

    const newUser = {
      name: signupData.name,
      contact: signupData.contact,
      email: signupData.email,
      password: signupData.password,
      dob: signupData.dob,
      status: "Active",
    };

    // Save new user in array
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Signup successful! You can login now.");
    setIsFlipped(false);
  };

  // ✅ Handle login
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === loginEmail && u.password === loginPassword
    );

    if (!foundUser) {
      alert("Invalid credentials or user not found!");
      return;
    }

    // Save current session user
    localStorage.setItem("user", JSON.stringify(foundUser));

    // Save to loggedInUsers list (for admin view)
    const loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];
    if (!loggedInUsers.some((u) => u.email === foundUser.email)) {
      loggedInUsers.push(foundUser);
      localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
    }

    alert(`Welcome back, ${foundUser.name}! 🎉`);

    // Redirect based on role
    if (foundUser.email === "hackeradmin@gmail.com") {
      navigate("/admindash"); // Admin
    } else {
      navigate("/userhome"); // Regular user
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-black position-relative overflow-hidden">
      <div className="bg-glow"></div>

      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        {/* 🔑 Front Side - Login */}
        <div className="flip-card-front glass-card p-4 p-md-5 rounded-4 shadow-lg mx-3">
          <h2 className="text-white fw-bold text-center">Welcome Back</h2>
          <p className="text-secondary text-center small mb-4">
            Sign in to your account
          </p>

          <input
            type="email"
            className="form-control bg-dark text-light border-0 mb-3"
            placeholder="username@gmail.com"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control bg-dark text-light border-0 mb-3"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <button
            className="btn btn-success w-100 fw-bold"
            style={{ borderRadius: "12px" }}
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="text-center text-secondary small mt-4">
            Don’t have an account?{" "}
            <button
              onClick={() => setIsFlipped(true)}
              className="btn btn-link text-success fw-semibold text-decoration-none p-0"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* 📝 Back Side - Signup */}
        <div className="flip-card-back glass-card p-4 p-md-5 rounded-4 shadow-lg mx-3">
          <h2 className="text-white fw-bold mb-2 text-center">Create Account</h2>
          <p className="text-secondary text-center small mb-4">
            Fill the details to sign up
          </p>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              className="form-control bg-dark text-light border-0 mb-3"
              placeholder="Full Name"
              value={signupData.name}
              onChange={(e) =>
                setSignupData({ ...signupData, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              className="form-control bg-dark text-light border-0 mb-3"
              placeholder="Contact"
              value={signupData.contact}
              onChange={(e) =>
                setSignupData({ ...signupData, contact: e.target.value })
              }
              required
            />
            <input
              type="email"
              className="form-control bg-dark text-light border-0 mb-3"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              className="form-control bg-dark text-light border-0 mb-3"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              required
            />
            <input
              type="password"
              className="form-control bg-dark text-light border-0 mb-3"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  confirmPassword: e.target.value,
                })
              }
              required
            />
            <input
              type="date"
              className="form-control bg-dark text-light border-0 mb-4"
              value={signupData.dob}
              onChange={(e) =>
                setSignupData({ ...signupData, dob: e.target.value })
              }
              required
            />

            <button
              type="submit"
              className="btn btn-success w-100 fw-semibold"
              style={{ borderRadius: "12px" }}
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-secondary small mt-4">
            Already have an account?{" "}
            <button
              onClick={() => setIsFlipped(false)}
              className="btn btn-link text-info fw-semibold text-decoration-none p-0"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
