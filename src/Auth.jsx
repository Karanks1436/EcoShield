import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
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
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate();

  const getDeviceType = () => {
    const ua = navigator.userAgent;
    return /Mobi|Android/i.test(ua) ? "mobile" : "desktop";
  };

  const sendOtpEmail = () => {
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(generated);

    const templateParams = {
      to_email: signupData.email,
      otp: generated,
    };

    emailjs
      .send(
        "service_6ho576f",
        "template_ohhufzp",
        templateParams,
        "D6VTLhpezsMJy0o0l"
      )
      .then(
        (response) => {
          alert("OTP sent to your email! Please check.");
          setOtpSent(true);
        },
        (error) => {
          alert("Failed to send OTP. Try again.");
        }
      );
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      alert("OTP verified successfully! You can now complete signup.");
      setOtpVerified(true);
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify OTP before signing up.");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!/^\d{10}$/.test(signupData.contact)) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        signupData.password
      )
    ) {
      alert(
        "Password must be at least 8 characters and include uppercase, lowercase, digit, and special character."
      );
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

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

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Signup successful! You can login now.");

    setLoginEmail(signupData.email);
    setLoginPassword(signupData.password);
    setIsFlipped(false);
    setOtpSent(false);
    setOtpVerified(false);
    setGeneratedOtp(null);
    setOtp("");
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === loginEmail && u.password === loginPassword
    );

    if (!foundUser) {
      alert("Invalid credentials or user not found!");
      return;
    }

    const deviceType = getDeviceType();
    const loggedInDevices =
      JSON.parse(localStorage.getItem("loggedInDevices")) || {};

    const userDevices = loggedInDevices[foundUser.email] || {
      mobile: false,
      desktop: false,
    };

    if (userDevices[deviceType]) {
      alert(
        `This account is already logged in on another ${deviceType} device.`
      );
      return;
    }

    userDevices[deviceType] = true;
    loggedInDevices[foundUser.email] = userDevices;
    localStorage.setItem("loggedInDevices", JSON.stringify(loggedInDevices));

    localStorage.setItem("user", JSON.stringify(foundUser));

    const loggedInUsers =
      JSON.parse(localStorage.getItem("loggedInUsers")) || [];
    if (!loggedInUsers.some((u) => u.email === foundUser.email)) {
      loggedInUsers.push(foundUser);
      localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
    }

    alert(`Welcome back, ${foundUser.name}! 🎉`);

    if (foundUser.email === "eco.shield.0001@gmail.com") {
      navigate("/admindash");
    } else {
      navigate("/userhome");
    }
  };

  const handleLogout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const deviceType = getDeviceType();
      const loggedInDevices =
        JSON.parse(localStorage.getItem("loggedInDevices")) || {};
      if (loggedInDevices[user.email]) {
        loggedInDevices[user.email][deviceType] = false;
        localStorage.setItem(
          "loggedInDevices",
          JSON.stringify(loggedInDevices)
        );
      }
    }
    localStorage.removeItem("user");
    navigate("/login");
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!otpSent) {
                sendOtpEmail();
              } else if (otpVerified) {
                handleSignup(e);
              }
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
              onChange={(e) =>
                /^\d*$/.test(e.target.value) &&
                e.target.value.length <= 10 &&
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
