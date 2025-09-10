import React, { useState } from "react";

export default function EmailBreaches() {
  const [email, setEmail] = useState("");
  const [breaches, setBreaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkBreaches = async () => {
    setError("");
    setBreaches([]);
    if (!email.includes("@")) {
      setError("⚠️ Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      // HaveIBeenPwned API (no API key needed for v3 range, but for email breaches you need an API key)
      const res = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`, {
        headers: {
          "hibp-api-key": "YOUR_API_KEY_HERE", // 🔑 required, get one from haveibeenpwned.com
        },
      });

      if (res.status === 404) {
        setError("✅ No breaches found for this email!");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error("API error");
      }

      const data = await res.json();
      setBreaches(data);
    } catch (err) {
      setError("❌ Error fetching breaches. Check API key / network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", background: "#111", color: "#0f0", minHeight: "100vh" }}>
      <h2>🔍 Email Breach Checker</h2>
      <p>Enter your Gmail to check if it appeared in data breaches.</p>

      <input
        type="email"
        placeholder="yourname@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "8px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={checkBreaches} disabled={loading}>
        {loading ? "Checking..." : "Check"}
      </button>

      {error && <p style={{ marginTop: "20px", color: "red" }}>{error}</p>}

      {breaches.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>⚠️ Found in {breaches.length} breach(es):</h3>
          <ul>
            {breaches.map((b) => (
              <li key={b.Name}>
                <b>{b.Name}</b> — {b.BreachDate} ({b.DataClasses.join(", ")})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
