// import React, { useState, useEffect } from "react";
// import { db } from "./firebase";
// import { collection, getDocs, addDoc } from "firebase/firestore";

// export default function SecurityDashboard() {
//   const [file, setFile] = useState(null);
//   const [scanResult, setScanResult] = useState("");
//   const [maliciousHashes, setMaliciousHashes] = useState([]);
//   const [email, setEmail] = useState("");
//   const [emailMessage, setEmailMessage] = useState("");

//   // Load known malicious hashes from Firestore
//   useEffect(() => {
//     const fetchHashes = async () => {
//       const snapshot = await getDocs(collection(db, "malicious_hashes"));
//       const hashes = snapshot.docs.map((doc) => doc.data().hash);
//       setMaliciousHashes(hashes);
//     };
//     fetchHashes();
//   }, []);

//   // File scan handler
//   const handleFileChange = (e) => {
//     const f = e.target.files[0];
//     if (!f) return;
//     setFile(f);

//     const reader = new FileReader();
//     reader.onload = async () => {
//       const arrayBuffer = reader.result;
//       const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
//       const hashArray = Array.from(new Uint8Array(hashBuffer));
//       const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

//       if (maliciousHashes.includes(hashHex)) {
//         setScanResult("⚠️ This file is malicious!");
//       } else {
//         setScanResult("✅ File appears safe.");
//       }
//     };
//     reader.readAsArrayBuffer(f);
//   };

//   // Email check handler
//   const handleEmailCheck = async () => {
//     if (!email) return;
//     setEmailMessage(`Checking ${email}...`);

//     try {
//       await addDoc(collection(db, "email_checks"), { email, createdAt: new Date() });
//       setEmailMessage(`✅ ${email} checked and stored in database.`);
//     } catch (err) {
//       console.error(err);
//       setEmailMessage("Error saving email.");
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>🔒 Security Dashboard</h2>

//       {/* File Scanner */}
//       <div className="section">
//         <h3>1. Scan a File</h3>
//         <input type="file" onChange={handleFileChange} className="input-file" />
//         {file && <p className="info">File: {file.name}</p>}
//         {scanResult && <p className="result">{scanResult}</p>}
//       </div>

//       {/* Email Check */}
//       <div className="section">
//         <h3>2. Check Email Breach (Optional)</h3>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="input-text"
//         />
//         <button onClick={handleEmailCheck} className="btn">Check Email</button>
//         {emailMessage && <p className="result">{emailMessage}</p>}
//       </div>

//       <div className="section">
//         <h3>⚠️ Note</h3>
//         <p className="note">
//           This dashboard <strong>cannot access your full device</strong>. It can only scan uploaded files and log emails.
//           For real antivirus protection, install a dedicated antivirus software on your system.
//         </p>
//       </div>

//       {/* Internal CSS */}
//       <style>{`
//         .dashboard-container {
//           background-color: #121212;
//           color: #eeeeee;
//           min-height: 100vh;
//           padding: 40px 20px;
//           font-family: 'Segoe UI', sans-serif;
//         }
//         h2 {
//           text-align: center;
//           color: #00cc66;
//           margin-bottom: 30px;
//         }
//         .section {
//           background-color: #1e1e1e;
//           padding: 20px;
//           border-radius: 10px;
//           margin-bottom: 25px;
//           border-left: 4px solid #00cc66;
//         }
//         h3 {
//           margin-top: 0;
//           color: #00cc66;
//         }
//         .input-file, .input-text {
//           width: 100%;
//           padding: 10px;
//           margin-top: 10px;
//           border-radius: 6px;
//           border: 1px solid #444;
//           background-color: #000;
//           color: #fff;
//           font-size: 1rem;
//         }
//         .btn {
//           margin-top: 10px;
//           padding: 10px 15px;
//           background-color: #00cc66;
//           color: #000;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           font-weight: bold;
//           transition: 0.3s;
//         }
//         .btn:hover {
//           background-color: #00994d;
//           color: #fff;
//         }
//         .info {
//           margin-top: 10px;
//           color: #ccc;
//         }
//         .result {
//           margin-top: 10px;
//           font-weight: bold;
//         }
//         .note {
//           font-size: 0.95rem;
//           color: #ffcc00;
//         }
//       `}</style>
//     </div>
//   );
// }
