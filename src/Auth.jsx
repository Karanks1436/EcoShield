import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

export default function LoginSignupCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Login States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // Signup States
  const [signupData, setSignupData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateSignupData = (field, value) => {
    let error = "";
    switch (field) {
      case "contact":
        if (!/^\d{0,10}$/.test(value)) error = "Contact must contain up to 10 digits.";
        break;
      case "email":
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          error = "Invalid email format.";
        break;
      case "password":
        if (
          value &&
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value)
        )
          error = "Min 8 chars, uppercase, lowercase, digit, special char required.";
        break;
      case "confirmPassword":
        if (value !== signupData.password) error = "Passwords do not match.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const sendOtpEmail = () => {
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(generated);
    const templateParams = {
      to_email: signupData.email,
      otp: generated,
    };
    emailjs
      .send("service_6ho576f", "template_6jt6pid", templateParams, "D6VTLhpezsMJy0o0l")
      .then(() => {
        alert("OTP sent to your email! Please check.");
        setOtpSent(true);
      })
      .catch(() => alert("Failed to send OTP. Try again."));
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      alert("OTP verified successfully!");
      setOtpVerified(true);
    } else {
      alert("Incorrect OTP.");
    }
  };

 const handleSignup = async (e) => {
  e.preventDefault();
  if (!otpVerified) return alert("Please verify OTP first.");
  try {
    const response = await fetch("https://eco-shield-backend.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });
    const result = await response.json();
    if (response.ok) {
      alert("Signup successful!");

      // ✅ Save email to localStorage
      localStorage.setItem("user", JSON.stringify({ email: signupData.email }));

      setLoginEmail(signupData.email);
      setLoginPassword(signupData.password);
      setIsFlipped(false);
      setOtp("");
      setOtpSent(false);
      setOtpVerified(false);
      setGeneratedOtp(null);
    } else {
      alert(result.error || "Signup failed.");
    }
  } catch (err) {
    alert("Server error during signup.");
  }
};

const handleLogin = async () => {
  if (!acceptedTerms) return alert("Please accept the Terms & Conditions.");
  try {
    const response = await fetch("https://eco-shield-backend.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });
    const result = await response.json();

    if (response.ok) {
      alert("Login successful!");

      // ✅ Save email to localStorage
      localStorage.setItem("user", JSON.stringify({ email: loginEmail }));

      setLoggedIn(true);
      navigate("/userhome");
    } else {
      alert(result.error || "Invalid credentials.");
    }
  } catch {
    alert("Server error during login.");
  }
};

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-black position-relative overflow-hidden">
      <div className="bg-glow"></div>

      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        {/* Login Side */}
        <div className="flip-card-front glass-card p-4 p-md-5 rounded-4 shadow-lg mx-3">
          <h2 className="text-white fw-bold text-center">Welcome Back</h2>
          <p className="text-secondary text-center small mb-4">Sign in to your account</p>

          <input
            type="email"
            className="form-control bg-dark text-light border-0 mb-3"
            placeholder="username@gmail.com"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control bg-dark text-light border-0 mb-3"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer", color: "#ccc" }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Terms & Conditions */}
          <div className="form-check mb-3 text-light">
            <input
              type="checkbox"
              className="form-check-input"
              id="termsCheck"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
            />
            <label className="form-check-label small" htmlFor="termsCheck">
              I agree to the{" "}
              <a
                href="/terms"
                className="text-decoration-underline text-success"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & Conditions
              </a>
            </label>
          </div>

          <button
            className="btn btn-success w-100 fw-bold mb-3"
            style={{ borderRadius: "12px" }}
            onClick={handleLogin}
            disabled={!acceptedTerms}
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

        {/* Signup Side */}
        <div className="flip-card-back glass-card p-4 p-md-5 rounded-4 shadow-lg mx-3">
          <h2 className="text-white fw-bold mb-2 text-center">Create Account</h2>
          <p className="text-secondary text-center small mb-4">
            Fill the details to sign up
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!otpSent) sendOtpEmail();
              else if (otpVerified) handleSignup(e);
            }}
          >
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
              placeholder="Contact (10 digits)"
              value={signupData.contact}
              maxLength="10"
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && value.length <= 10) {
                  setSignupData({ ...signupData, contact: value });
                  validateSignupData("contact", value);
                }
              }}
            />
            {errors.contact && (
              <small className="text-danger">{errors.contact}</small>
            )}

            <input
              type="email"
              className="form-control bg-dark text-light border-0 mb-3"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) => {
                const value = e.target.value;
                setSignupData({ ...signupData, email: value });
                validateSignupData("email", value);
              }}
              required
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}

            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control bg-dark text-light border-0 mb-3"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) => {
                  const value = e.target.value;
                  setSignupData({ ...signupData, password: value });
                  validateSignupData("password", value);
                }}
                required
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer", color: "#ccc" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}

            <div className="position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control bg-dark text-light border-0 mb-3"
                placeholder="Confirm Password"
                value={signupData.confirmPassword}
                onChange={(e) => {
                  const value = e.target.value;
                  setSignupData({ ...signupData, confirmPassword: value });
                  validateSignupData("confirmPassword", value);
                }}
                required
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                style={{ cursor: "pointer", color: "#ccc" }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <small className="text-danger">{errors.confirmPassword}</small>
            )}

            <input
              type="date"
              className="form-control bg-dark text-light border-0 mb-3"
              value={signupData.dob}
              onChange={(e) =>
                setSignupData({ ...signupData, dob: e.target.value })
              }
              required
            />

            {!otpSent && (
              <button
                type="button"
                className="btn btn-primary w-100 fw-semibold"
                style={{ borderRadius: "12px" }}
                onClick={sendOtpEmail}
              >
                Send OTP
              </button>
            )}

            {otpSent && !otpVerified && (
              <>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-0 mb-3 mt-3"
                  placeholder="Enter OTP"
                  value={otp}
                  maxLength="6"
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-warning w-100 fw-semibold"
                  style={{ borderRadius: "12px" }}
                  onClick={verifyOtp}
                >
                  Verify OTP
                </button>
              </>
            )}

            {otpVerified && (
              <button
                type="submit"
                className="btn btn-success w-100 fw-semibold mt-3"
                style={{ borderRadius: "12px" }}
              >
                Complete Signup
              </button>
            )}
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
