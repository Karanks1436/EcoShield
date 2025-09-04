import React, { useState } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ImeiLookup() {
  const [imei, setImei] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDeviceDetails = async () => {
    setError("");
    if (!imei || imei.length !== 15 || !/^\d+$/.test(imei)) {
      setError("⚠️ Please enter a valid 15-digit IMEI number.");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const payload = {
        contents: [
          {
            parts: [
              {
                text: `The user has entered IMEI number: ${imei}. 
                Based on this IMEI, provide details such as:
                - Device brand and model
                - Release year
                - Network compatibility
                - Known issues or vulnerabilities (if any)
                Format the response in clean bullet points.`
              },
            ],
          },
        ],
      };

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=apikey`,
        payload
      );

      const text = response.data.candidates[0].content.parts[0].text;
      setResult(text);
    } catch (err) {
      console.error("❌ Error fetching device details:", err);
      setError("❌ Error fetching device details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-black text-light">
      <div className="card p-4 w-75" style={{ backgroundColor: "#0d0d0d", border: "1px solid #00ff88", borderRadius: "12px" }}>
        
        <h2 className="text-center mb-3" style={{ color: "#00ff88" }}>
          🔍 IMEI Device Info Lookup
        </h2>
        
        <p className="text-center text-muted">
          Enter your <strong>15-digit IMEI</strong> number to fetch device details.
        </p>
        <p className="text-center text-success">
          To check your IMEI, dial <strong>*#06#</strong>
        </p>

        <input
          type="text"
          className="form-control mb-3 bg-dark text-light border-success"
          placeholder="Enter 15-digit IMEI number"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
        />

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <button
          className="btn w-100 mb-3"
          onClick={fetchDeviceDetails}
          disabled={loading}
          style={{ backgroundColor: "#00ff88", color: "#000", fontWeight: "bold" }}
        >
          {loading ? (
            <span>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Fetching Details...
            </span>
          ) : (
            "Get Device Info"
          )}
        </button>

        {result && (
          <div className="p-3 mt-3" style={{ backgroundColor: "#001a0f", border: "1px solid #00ff88", borderRadius: "8px" }}>
            <h5 style={{ color: "#00ff88" }}>📋 Device Details</h5>
            <SyntaxHighlighter language="markdown" style={darcula} wrapLongLines>
              {result}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
}
