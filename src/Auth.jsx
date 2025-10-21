
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import "./Login.css"; // custom css for flip animation

const API = "https://eco-shield-backend-0bdn.onrender.com";

// ✅ Safe getter for user
const getStoredUser = () => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

export default function AuthCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  // Signup states
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });

  // Login states
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpStep, setOtpStep] = useState(false);

  // ✅ Terms & Conditions checkbox
  const [agreed, setAgreed] = useState(false);

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    const storedUser = getStoredUser();
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      navigate("/userhome");
    }
  }, [navigate]);

  // 🔹 Validation function
  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) error = "Invalid email format";
        break;
      case "password":
        if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (value !== form.password) error = "Passwords do not match";
        break;
      case "contact":
        if (!/^\d{10}$/.test(value)) error = "Contact must be 10 digits";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e, type = "signup") => {
    const { name, value } = e.target;
    if (type === "signup") {
      setForm({ ...form, [name]: value });
      validate(name, value);
    } else {
      setLogin({ ...login, [name]: value });
      validate(name, value);
    }
  };

  // 🔹 OTP Generator
  const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  // 🔹 Send OTP via EmailJS
  const sendOtpEmail = async () => {
    const otpValue = generateOtp();
    setGeneratedOtp(otpValue);

    const templateParams = {
      to_name: form.name || "User",
      to_email: form.email,
      otp: otpValue,
    };

    try {
      await emailjs.send(
        "service_6ho576f",
        "template_6jt6pid",
        templateParams,
        "D6VTLhpezsMJy0o0l"
      );
      alert("OTP sent to your email!");
      setOtpStep(true);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send OTP");
    }
  };

  // 🔹 Signup API after OTP verification
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!otpStep) {
      // Step 1 → send OTP
      sendOtpEmail();
      return;
    }

    // Step 2 → verify OTP
    if (otp !== generatedOtp) {
      alert("Invalid OTP");
      return;
    }

    try {
      const res = await axios.post(`${API}/signup`, form);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      alert(res.data.message || "Signup successful! Please login now.");

      // ✅ Auto-fill login form
      setLogin({
        email: form.email,
        password: form.password,
      });

      // ✅ Reset OTP step and flip back to login
      setOtpStep(false);
      setIsFlipped(false);
      setAgreed(false); // reset checkbox
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  // 🔹 Login API
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/login`, login);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      localStorage.setItem("user", JSON.stringify({ email: login.email }));

      alert(res.data.message || "Login successful!");
      navigate("/userhome");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isFlipped ? "flipped" : ""}`}>
        {/* 🔹 Front Side - Login */}
        <div className="auth-front">
          <h2 className="metalicgold">Login</h2>
          <form onSubmit={handleLogin}>
            <input className="my-1"
              type="email"
              name="email"
              placeholder="Email"
              value={login.email}
              onChange={(e) => handleChange(e, "login")}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <div className="password-field">
              <input className="my-1"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={login.password}
                onChange={(e) => handleChange(e, "login")}
                required
              />
              <span
                className="toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}

            <button type="submit" className="rounded-4">Login</button>
          </form>
          <p>
            Don’t have an account?{" "}
            <span className="flip-btn" onClick={() => setIsFlipped(true)}>
              Sign up
            </span>
          </p>
        </div>

        {/* 🔹 Back Side - Signup */}
        <div className="auth-back">
          <h2 className="metalicgold">Sign Up</h2>
          <form onSubmit={handleSignup}>
            {!otpStep ? (
              <>
                <input className="my-1"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

                <input className="my-1"
                  type="text"
                  name="contact"
                  placeholder="Contact (10 digits)"
                  value={form.contact}
                  onChange={handleChange}
                  maxLength={10}
                  required
                />
                {errors.contact && <p className="error">{errors.contact}</p>}

                <input className="my-1"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <input className="my-1"
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  required
                />

                <div className="password-field">
                  <input className="my-1"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className="toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && <p className="error">{errors.password}</p>}

                <input className="my-1"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword}</p>
                )}

                {/* ✅ Terms & Conditions Checkbox */}
                <div className="terms-checkbox">
                  <input className="my-1"
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <label htmlFor="terms">
                    I agree to the <a href="/terms" className="text-primary">Terms & Conditions</a>
                  </label>
                </div>

                <button type="submit" className="rounded-4" disabled={!agreed}>
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input className="my-1"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <button type="submit">Verify & Sign Up</button>
              </>
            )}
          </form>
          <p>
            Already have an account?{" "}
            <span className="flip-btn" onClick={() => setIsFlipped(false)}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}







// import React, { useState, useEffect } from "react";
// import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import emailjs from "emailjs-com";
// import "./Login.css";

// import { auth, db } from "./firebase"; 
// import { 
//   createUserWithEmailAndPassword, 
//   signInWithEmailAndPassword, 
//   GoogleAuthProvider, 
//   signInWithPopup 
// } from "firebase/auth";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// // ✅ Safe getter for user
// const getStoredUser = () => {
//   try {
//     const data = localStorage.getItem("user");
//     return data ? JSON.parse(data) : null;
//   } catch {
//     localStorage.removeItem("user");
//     return null;
//   }
// };

// export default function AuthCard() {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     contact: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     dob: "",
//   });

//   const [login, setLogin] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [generatedOtp, setGeneratedOtp] = useState(null);
//   const [otpStep, setOtpStep] = useState(false);
//   const [agreed, setAgreed] = useState(false);

//   useEffect(() => {
//     const storedUser = getStoredUser();
//     if (storedUser) navigate("/userhome");
//   }, [navigate]);

//   const validate = (name, value) => {
//     let error = "";
//     switch (name) {
//       case "email":
//         if (!/^\S+@\S+\.\S+$/.test(value)) error = "Invalid email format";
//         break;
//       case "password":
//         if (value.length < 6) error = "Password must be at least 6 characters";
//         break;
//       case "confirmPassword":
//         if (value !== form.password) error = "Passwords do not match";
//         break;
//       case "contact":
//         if (!/^\d{10}$/.test(value)) error = "Contact must be 10 digits";
//         break;
//       default:
//         break;
//     }
//     setErrors((prev) => ({ ...prev, [name]: error }));
//   };

//   const handleChange = (e, type = "signup") => {
//     const { name, value } = e.target;
//     if (type === "signup") {
//       setForm({ ...form, [name]: value });
//       validate(name, value);
//     } else {
//       setLogin({ ...login, [name]: value });
//       validate(name, value);
//     }
//   };

//   const generateOtp = () =>
//     Math.floor(100000 + Math.random() * 900000).toString();

//   const sendOtpEmail = async () => {
//     const otpValue = generateOtp();
//     setGeneratedOtp(otpValue);

//     const templateParams = {
//       to_name: form.name || "User",
//       to_email: form.email,
//       otp: otpValue,
//     };

//     try {
//       await emailjs.send(
//         "service_6ho576f",
//         "template_6jt6pid",
//         templateParams,
//         "D6VTLhpezsMJy0o0l"
//       );
//       alert("OTP sent to your email!");
//       setOtpStep(true);
//     } catch (error) {
//       console.error("EmailJS Error:", error);
//       alert("Failed to send OTP");
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (!otpStep) {
//       sendOtpEmail();
//       return;
//     }
//     if (otp !== generatedOtp) {
//       alert("Invalid OTP");
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
//       const user = userCredential.user;

//       await setDoc(doc(db, "Users", user.uid), {
//         name: form.name,
//         contact: form.contact,
//         email: form.email,
//         dob: form.dob,
//         createdAt: new Date().toISOString()
//       });

//       localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }));
//       alert("Signup successful!");
//       setOtpStep(false);
//       setIsFlipped(false);
//       setAgreed(false);
//       setLogin({ email: form.email, password: form.password });
//     } catch (err) {
//       if (err.code === "auth/email-already-in-use") {
//         alert("This email is already registered. Please login instead.");
//         setIsFlipped(false);
//       } else {
//         console.error(err);
//         alert(err.message || "Signup failed");
//       }
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, login.email, login.password);
//       const user = userCredential.user;
//       const userDoc = await getDoc(doc(db, "Users", user.uid));
//       const userData = userDoc.exists() ? userDoc.data() : { email: user.email };
//       localStorage.setItem("user", JSON.stringify({ uid: user.uid, ...userData }));
//       alert("Login successful!");
//       navigate("/userhome");
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Login failed");
//     }
//   };

//   // 🔹 Google Login
//   const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       // Check if user already exists in Firestore
//       const userRef = doc(db, "Users", user.uid);
//       const userDoc = await getDoc(userRef);

//       if (!userDoc.exists()) {
//         await setDoc(userRef, {
//           name: user.displayName || "",
//           email: user.email,
//           contact: "",
//           dob: "",
//           createdAt: new Date().toISOString()
//         });
//       }

//       localStorage.setItem("user", JSON.stringify({
//         uid: user.uid,
//         name: user.displayName,
//         email: user.email
//       }));

//       alert("Google login successful!");
//       navigate("/userhome");
//     } catch (err) {
//       console.error(err);
//       alert(err.message || "Google login failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className={`auth-card ${isFlipped ? "flipped" : ""}`}>
//         {/* Front Side - Login */}
//         <div className="auth-front">
//           <h2>Login</h2>
//           <form onSubmit={handleLogin}>
//             <input className="my-1" type="email" name="email" placeholder="Email" value={login.email} onChange={(e) => handleChange(e, "login")} required />
//             {errors.email && <p className="error">{errors.email}</p>}
//             <div className="password-field">
//               <input className="my-1" type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={login.password} onChange={(e) => handleChange(e, "login")} required />
//               <span className="toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
//             </div>
//             {errors.password && <p className="error">{errors.password}</p>}
//             <button type="submit">Login</button>
//           </form>

//           <button className="google-login-btn" onClick={handleGoogleLogin}>
//             <FaGoogle /> Sign in with Google
//           </button>

//           <p>Don’t have an account? <span className="flip-btn" onClick={() => setIsFlipped(true)}>Sign up</span></p>
//         </div>

//         {/* Back Side - Signup */}
//         <div className="auth-back">
//           <h2>Sign Up</h2>
//           <form onSubmit={handleSignup}>
//             {!otpStep ? (
//               <>
//                 <input className="my-1" type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
//                 <input className="my-1" type="text" name="contact" placeholder="Contact (10 digits)" value={form.contact} onChange={handleChange} maxLength={10} required />
//                 {errors.contact && <p className="error">{errors.contact}</p>}
//                 <input className="my-1" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
//                 {errors.email && <p className="error">{errors.email}</p>}
//                 <input className="my-1" type="date" name="dob" value={form.dob} onChange={handleChange} required />
//                 <div className="password-field">
//                   <input className="my-1" type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
//                   <span className="toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
//                 </div>
//                 {errors.password && <p className="error">{errors.password}</p>}
//                 <input className="my-1" type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
//                 {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

//                 <div className="terms-checkbox">
//                   <input className="my-1" type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
//                   <label htmlFor="terms">I agree to the <a href="/terms" className="text-primary">Terms & Conditions</a></label>
//                 </div>

//                 <button type="submit" disabled={!agreed}>Send OTP</button>
//               </>
//             ) : (
//               <>
//                 <input className="my-1" type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
//                 <button type="submit">Verify & Sign Up</button>
//               </>
//             )}
//           </form>

//           <p>Already have an account? <span className="flip-btn" onClick={() => setIsFlipped(false)}>Login</span></p>
//         </div>
//       </div>
//     </div>
//   );
// }


