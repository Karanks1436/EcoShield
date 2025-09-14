import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setName(storedUser.name || "");
      setContact(storedUser.contact || "");
    }
  }, []);

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const sendOtp = async () => {
    const newOtp = generateOtp();
    setGeneratedOtp(newOtp);

    try {
      await emailjs.send(
        "service_6ho576f",
        "template_ohhufzp",
        {
          to_email: user.email,
          otp: newOtp,
          user_name: name,
          type: "password",
        },
        "D6VTLhpezsMJy0o0l"
      );
      setOtpSent(true);
      alert(`OTP sent to ${user.email}`);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP. Try again.");
    }
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true);
      alert("OTP verified. You can now change your password.");
    } else {
      alert("Incorrect OTP");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (password && !otpVerified) {
      alert("You must verify OTP before changing password!");
      return;
    }

    const updatedUser = { ...user, name, contact, password: otpVerified ? password : user.password };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setPassword("");
    setOtp("");
    setOtpSent(false);
    setOtpVerified(false);
    alert("Profile updated successfully!");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      padding: "2rem",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "550px",
        padding: "2rem",
        borderRadius: "20px",
        background: "rgba(25,25,25,0.75)",
        backdropFilter: "blur(15px)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
        color: "#fff",
        animation: "fadeIn 0.8s ease-in-out"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "2rem", color: "#00ff99" }}>Profile</h2>
        <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          
          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Email:
            <input type="email" value={user.email || ""} readOnly style={inputStyle} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Contact:
            <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required style={inputStyle} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" style={inputStyle} />
            <small style={{ color: "#aaa" }}>Leave blank to keep current password. Changing requires OTP verification.</small>
          </label>

          {password && !otpVerified && (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              <button type="button" onClick={sendOtp} style={otpButtonStyle}>
                {otpSent ? "Resend OTP" : "Send OTP"}
              </button>

              {otpSent && (
                <>
                  <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} style={inputStyle} />
                  <button type="button" onClick={verifyOtp} style={{ ...otpButtonStyle, background: "#007bff" }}>
                    Verify OTP
                  </button>
                </>
              )}
            </div>
          )}

          <button type="submit" style={{ ...otpButtonStyle, background: "#00cc88", marginTop: "1rem" }}>
            Update Profile
          </button>
        </form>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-20px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        input::placeholder {
          color: #777;
        }
        input:focus {
          outline: none;
          border-color: #00ff99;
          box-shadow: 0 0 8px #00ff99;
        }
        button:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}

// Shared input and button styles
const inputStyle = {
  width: "100%",
  padding: "0.65rem",
  borderRadius: "10px",
  border: "1px solid #444",
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  transition: "0.3s ease"
};

const otpButtonStyle = {
  flex: 1,
  padding: "0.65rem",
  borderRadius: "10px",
  background: "#00ff99",
  color: "#111",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
  transition: "0.3s ease"
};
