import React from "react";

function Termsandconditions() {
  const styles = {
    container: {
      minHeight: "100vh",
      padding: "40px",
      backgroundColor: "#121212",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      color: "green",
      fontSize: "2.5rem",
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: "30px",
    },
    section: {
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "#1e1e1e",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 0 10px rgba(0, 255, 0, 0.2)",
    },
    paragraph: {
      fontSize: "1rem",
      lineHeight: "1.7",
      marginBottom: "20px",
      color: "#ccc",
    },
    list: {
      paddingLeft: "20px",
      color: "#bbb",
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Terms & Conditions</h1>
      <div style={styles.section}>
        <p style={styles.paragraph}>
          By using our service, you agree to the following terms and conditions.
          Please read them carefully.
        </p>

        <p style={styles.paragraph}>
          These terms govern your use of our website and services and provide
          important information regarding your legal rights, remedies, and
          obligations.
        </p>

        <ul style={styles.list}>
          <li>You must be 18 years or older to use this service.</li>
          <li>Do not misuse or interfere with the services or try to access them using a method other than the interface and the instructions that we provide.</li>
          <li>We may suspend or stop providing our services if you do not comply with our terms or policies.</li>
          <li>Your data must not be used in accordance with our privacy policy.</li>
        </ul>

        <p style={styles.paragraph}>
          By continuing to use our site, you acknowledge that you have read,
          understood, and agreed to be bound by these terms.
        </p>
      </div>
    </div>
  );
}

export default Termsandconditions;
