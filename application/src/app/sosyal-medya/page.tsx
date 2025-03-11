"use client"

import { useEffect } from "react";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

export default function SosyalMedya() {
  const handleBack = () => {
    window.history.back();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div style={styles.container}>
      <button onClick={handleBack} style={styles.backButton}>
        ← GERI
      </button>

      <h1 style={styles.title}>Sosyal Mecralarımız</h1>
      <p style={styles.subtitle}>
        En son haberler, etkinlikler ve içerikler için bize katılın!
      </p>

      <div style={styles.socialContainer}>
        <a
          href="https://instagram.com/ACTQ.Quimper"
          target="_blank"
          style={{ ...styles.socialButton, backgroundColor: "#E1306C" }}
        >
          <FaInstagram size={40} />
          <span style={styles.widgetText}>Instagram</span>
        </a>
        <a
          href="https://youtube.com/@ACTQ.Quimper"
          target="_blank"
          style={{ ...styles.socialButton, backgroundColor: "#FF0000" }}
        >
          <FaYoutube size={40} />
          <span style={styles.widgetText}>YouTube</span>
        </a>
        <a
          href="https://facebook.com/ACTQ.Quimper"
          target="_blank"
          style={{ ...styles.socialButton, backgroundColor: "#1877F2" }}
        >
          <FaFacebook size={40} />
          <span style={styles.widgetText}>Facebook</span>
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(to right, #FFDEE9, #B5FFFC)",
    color: "#333",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "center",
    padding: "60px 20px",
    fontFamily: "'Arial', sans-serif",
    overflow: "hidden",
  } as React.CSSProperties,
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "10px",
    textShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
  } as React.CSSProperties,
  subtitle: {
    fontSize: "18px",
    color: "#444",
    marginBottom: "30px",
  } as React.CSSProperties,
  socialContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  } as React.CSSProperties,
  socialButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100px",
    height: "100px",
    borderRadius: "15px",
    color: "#fff",
    fontSize: "20px",
    textDecoration: "none",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
  } as React.CSSProperties,
  widgetText: {
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "8px",
  } as React.CSSProperties,
  backButton: {
    backgroundColor: "rgba(28, 28, 28, 0.5)",
    border: "2px solid rgb(28, 28, 28)",  
    padding: "12px 20px",
    fontSize: "16px",
    color: "rgb(255, 255, 255)",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "50px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    position: "absolute",
    top: "20px",
    left: "20px",
    zIndex: 10,  
  } as React.CSSProperties,
};