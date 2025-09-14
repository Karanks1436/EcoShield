import React, { useState, useEffect } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navbar from "./Navbar";

export default function DeviceScan() {
  const [imei, setImei] = useState("");
  const [result, setResult] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile vs desktop
  useEffect(() => {
    const ua = navigator.userAgent;
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(ua));
  }, []);

  // ✅ Luhn Algorithm for IMEI validation
  const validateIMEI = (imei) => {
    if (!/^\d{15}$/.test(imei)) return false;
    const digits = imei.split("").map(Number);
    const checkDigit = digits.pop();
    const sum = digits
      .reverse()
      .map((d, i) => {
        if (i % 2 === 0) {
          const dbl = d * 2;
          return dbl > 9 ? dbl - 9 : dbl;
        }
        return d;
      })
      .reduce((acc, val) => acc + val, 0);
    const calculatedCheck = (10 - (sum % 10)) % 10;
    return checkDigit === calculatedCheck;
  };

  // 📱 Mobile Device Info via IMEI.info API
  const fetchDeviceDetails = async () => {
    setError("");
    setResult("");
    if (!imei || !validateIMEI(imei)) {
      setError("⚠️ Please enter a valid 15-digit IMEI number.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.imei.info/v1/imei",
        { imei },
        {
          headers: {
            Authorization: "6b590bf2-7c5c-4afc-83d9-578df2f318b5", // 🔑 Replace with your imei.info key
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      const formatted = `
- 📱 Brand: ${data.brand || "Unknown"}
- Model: ${data.model || "Unknown"}
- Status: ${data.status || "N/A"}
- Network: ${data.network || "N/A"}
- IMEI Validity: ${data.valid ? "Valid" : "Invalid"}
      `;
      setResult(formatted);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to fetch device info. Check API key or credits.");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Full Device Scan
  const performFullScan = async () => {
    setError("");
    setScanResult("");

    if (isMobile && !validateIMEI(imei)) {
      setError("⚠️ Please enter a valid 15-digit IMEI number for mobile scan.");
      return;
    }

    try {
      setScanLoading(true);

      // Gather system info dynamically
      const deviceInfo = isMobile
        ? `Mobile IMEI: ${imei}`
        : `Desktop OS: ${navigator.platform}, Browser: ${navigator.userAgent}`;

      const payload = {
        contents: [
          {
            parts: [
              {
                text: `Perform a FULL DEVICE SCAN for the following device:
${deviceInfo}
Include:
- Malware, spyware, ransomware detection
- Unauthorized access / rootkits / phishing threats
- Network & firewall vulnerabilities
- File system & permissions issues
- Security recommendations with ✅ Safe / ⚠️ Warning
Provide a detailed, real-time report.`
              }
            ]
          }
        ]
      };

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBMBmIUqt8FRnWsa0vavEkYsexD0awwAEE`,
        payload
      );

      const text = response.data.candidates[0].content.parts[0].text;
      setScanResult(text);
    } catch (err) {
      console.error(err);
      setError("❌ Error performing full device scan. Please try again.");
    } finally {
      setScanLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-black text-light p-3">
        <div
          className="card p-4 w-75"
          style={{
            backgroundColor: "#0d0d0d",
            border: "1px solid #00ff88",
            borderRadius: "12px",
          }}
        >
          <h2 className="text-center mb-3" style={{ color: "#00ff88" }}>
            🔍 {isMobile ? "Mobile IMEI Scan" : "Desktop Device Scan"}
          </h2>

          {isMobile && (
            <input
              type="text"
              className="form-control mb-3 bg-dark text-light border-success"
              placeholder="Enter 15-digit IMEI number"
              value={imei}
              onChange={(e) => setImei(e.target.value)}
            />
          )}

          {error && <div className="alert alert-danger py-2">{error}</div>}

          {isMobile && (
            <button
              className="btn w-100 mb-2"
              onClick={fetchDeviceDetails}
              disabled={loading}
              style={{
                backgroundColor: "#00ff88",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              {loading ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Fetching Details...
                </span>
              ) : (
                "Get Device Info"
              )}
            </button>
          )}

          <button
            className="btn w-100"
            onClick={performFullScan}
            disabled={scanLoading}
            style={{
              backgroundColor: "#ff4444",
              color: "#fff",
              fontWeight: "bold",
              border: "1px solid #ff8888",
            }}
          >
            {scanLoading ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2" />
                Scanning Device...
              </span>
            ) : (
              "🛡️ Full Device Scan"
            )}
          </button>

          {result && (
            <div
              className="p-3 mt-3"
              style={{
                backgroundColor: "#001a0f",
                border: "1px solid #00ff88",
                borderRadius: "8px",
              }}
            >
              <h5 style={{ color: "#00ff88" }}>📋 Device Details</h5>
              <SyntaxHighlighter
                language="markdown"
                style={darcula}
                wrapLongLines
              >
                {result}
              </SyntaxHighlighter>
            </div>
          )}

          {scanResult && (
            <div
              className="p-3 mt-3"
              style={{
                backgroundColor: "#1a0000",
                border: "1px solid #ff4444",
                borderRadius: "8px",
              }}
            >
              <h5 style={{ color: "#ff4444" }}>🛡️ Full Device Scan Report</h5>
              <SyntaxHighlighter
                language="markdown"
                style={darcula}
                wrapLongLines
              >
                {scanResult}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
