
import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./ImeiChecker.module.css"; // Import CSS for dynamic styling

const scanSteps = [
  "Initializing hardware checks",
  "Checking system files",
  "Scanning installed apps",
  "Analyzing network activity",
  "Detecting unusual behaviors",
  "Verifying permissions",
  "Inspecting background processes",
  "Monitoring data usage",
  "Scanning for malware signatures",
  "Checking for unauthorized access",
  "Testing device sensors",
  "Verifying software versions",
  "Analyzing battery usage patterns",
  "Performing firewall checks",
  "Finalizing scan",
];

const safetySteps = [
  "Keep your software up-to-date",
  "Use strong, unique passwords",
  "Avoid suspicious links or downloads",
  "Enable two-factor authentication",
  "Regularly back up your data",
  "Install trusted security apps",
  "Review app permissions carefully",
  "Avoid public Wi-Fi for sensitive tasks",
  "Monitor device behavior for anomalies",
  "Use VPNs on unsecured networks",
];

const DynamicScanDevice = () => {
  const [imei, setImei] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userEmail, setUserEmail] = useState(null);
  const [scanLogs, setScanLogs] = useState([]);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [scanCompletedTime, setScanCompletedTime] = useState(null);

  const imeiInputRef = useRef(null);
  const scanBtnRef = useRef(null);
  const logsEndRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserEmail(user ? user.email : null);
    });
    return () => unsubscribe();
  }, []);

  const getDeviceInfoFromIMEI = () => ({
    hasOldSoftware: Math.random() < 0.3,
    hasSuspiciousApps: Math.random() < 0.25,
    unusualNetworkActivity: Math.random() < 0.2,
    hasMaliciousPermissions: Math.random() < 0.15,
  });

  const simulateDeviceSecurityCheck = () => {
    const info = getDeviceInfoFromIMEI();
    return (
      info.hasOldSoftware ||
      info.hasSuspiciousApps ||
      info.unusualNetworkActivity ||
      info.hasMaliciousPermissions
    );
  };

  const shake = (element) => {
    if (!element) return;
    element.classList.add("shake");
    setTimeout(() => element.classList.remove("shake"), 500);
  };

  const handleScan = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      alert("You need to log in to perform a scan.");
      navigate("/login");
      return;
    }

    if (scanning || !imei.trim()) {
      if (!imei.trim()) shake(imeiInputRef.current);
      return;
    }

    setScanning(true);
    setScanLogs([]);
    setProgress(0);
    setResultsVisible(false);
    setScanCompletedTime(null);
    setScanResult(null);

    scanBtnRef.current.disabled = true;
    scanBtnRef.current.classList.add("btn-pulse");
    scanBtnRef.current.textContent = "Scanning...";

    for (let i = 0; i < scanSteps.length; i++) {
      const timestamp = new Date().toLocaleTimeString();
      setScanLogs((prev) => [...prev, `[${timestamp}] ${scanSteps[i]}...`]);
      setProgress(Math.min(100, ((i + 1) / scanSteps.length) * 100));
      await new Promise((res) => setTimeout(res, 1200)); // faster animation
    }

    setProgress(100);
    setResultsVisible(true);
    setScanCompletedTime(new Date());
    const isHacked = simulateDeviceSecurityCheck();
    setScanResult(isHacked ? "hacked" : "safe");

    try {
      await addDoc(collection(db, "scans"), {
        email: userEmail,
        imei,
        result: isHacked ? "hacked" : "safe",
        scanDate: new Date(),
      });

      const scanCountDocId = `${userEmail}_${imei}`;
      const scanCountRef = doc(db, "scanCounts", scanCountDocId);
      const scanCountSnap = await getDoc(scanCountRef);

      if (scanCountSnap.exists()) {
        await updateDoc(scanCountRef, {
          count: increment(1),
          lastScanned: new Date(),
        });
      } else {
        await setDoc(scanCountRef, {
          email: userEmail,
          imei,
          count: 1,
          lastScanned: new Date(),
        });
      }
    } catch (err) {
      console.error(err);
    }

    scanBtnRef.current.disabled = false;
    scanBtnRef.current.classList.remove("btn-pulse");
    scanBtnRef.current.textContent = "Start Scan";
    setScanning(false);

    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [scanLogs]);

  return (
    <>
      <Navbar />
    <div className="dark-theme">
      <div className="scanpage">
        <h1 className="scan-title">Device Security Scan</h1>

        {userEmail ? (
          <div className="user-info">User: {userEmail}</div>
        ) : (
          <div className="login-message">
            <p>Please log in to perform a scan</p>
            <button onClick={() => navigate("/login")}>Log In</button>
          </div>
        )}

        <div className="input-container">
          <input
            ref={imeiInputRef}
            type="text"
            placeholder="Enter IMEI number"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
            className="imei-input"
          />
          <button
            ref={scanBtnRef}
            onClick={handleScan}
            disabled={scanning || !userEmail}
            className="scan-button"
          >
            Start Scan
          </button>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="scan-logs">
          {scanLogs.map((log, idx) => (
            <p key={idx} className={`log-entry ${idx % 2 === 0 ? "even" : "odd"}`}>
              {log}
            </p>
          ))}
          <div ref={logsEndRef} />
        </div>

        {resultsVisible && (
          <div className={`scan-result ${scanResult}`}>
            <h2>{scanResult === "hacked" ? "⚠ Hacked!" : "✅ Safe"}</h2>
            <p>
              {scanResult === "hacked"
                ? "Immediate action is recommended!"
                : "Your device is secure. Keep it up!"}
            </p>
            <p>Scan completed at: {scanCompletedTime?.toLocaleTimeString()}</p>
          </div>
        )}

        <div className="safety-tips">
          <h3>Safety Tips</h3>
          {safetySteps.map((tip, idx) => (
            <p key={idx} className="tip">
              {tip}
            </p>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default DynamicScanDevice;
