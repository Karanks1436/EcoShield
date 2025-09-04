import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
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

  const navigate = useNavigate(); // ✅ navigation hook

  // Handle signup
  const handleSignup = (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save user to localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: signupData.name,
        contact: signupData.contact,
        email: signupData.email,
        password: signupData.password,
        dob: signupData.dob,
      })
    );

    alert("Signup successful! You can login now.");
    setIsFlipped(false);
  };

  // Handle login
  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (
      loginEmail === storedUser.email &&
      loginPassword === storedUser.password
    ) {
      alert(`Welcome back, ${storedUser.name}! 🎉`);

      // ✅ Redirect logic
      if (loginEmail === "hackeradmin@gmail.com") {
        navigate("/admindash"); // Admin
      } else {
        navigate("/userhome"); // Regular user
      }
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-black position-relative overflow-hidden">
      {/* Background Glow */}
      <div className="bg-glow"></div>

      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        {/* Front Side - Login */}
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

          {/* Social buttons */}
          <button className="btn w-100 d-flex align-items-center justify-content-center gap-2 mt-3 social-btn">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              width="18"
              height="18"
            />
            Continue with Google
          </button>

          <button className="btn w-100 d-flex align-items-center justify-content-center gap-2 social-btn mt-2">
            <img
              src="https://www.svgrepo.com/show/475689/twitter-color.svg"
              alt="x"
              width="18"
              height="18"
            />
            Continue with X
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

        {/* Back Side - Signup */}
        <div className="flip-card-back glass-card p-4 p-md-5 rounded-4 shadow-lg mx-3">
          <h2 className="text-white fw-bold mb-2 text-center">
            Create Account
          </h2>
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
            />
            <input
              type="text"
              className="form-control bg-dark text-light border-0 mb-3"
              placeholder="Contact"
              value={signupData.contact}
              onChange={(e) =>
                setSignupData({ ...signupData, contact: e.target.value })
              }
            />
            <input
              type="email"
              className="form-control bg-dark text-light border-0 mb-3"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            />
            <input
              type="password"
              className="form-control bg-dark text-light border-0 mb-3"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
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
            />
            <input
              type="date"
              className="form-control bg-dark text-light border-0 mb-4"
              value={signupData.dob}
              onChange={(e) =>
                setSignupData({ ...signupData, dob: e.target.value })
              }
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
