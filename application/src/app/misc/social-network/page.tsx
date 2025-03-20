"use client";

import { useEffect, useState } from "react";
import { FaInstagram, FaYoutube, FaFacebook, FaArrowLeft } from "react-icons/fa";

export default function SosyalMedya() {
  const [isHovered, setIsHovered] = useState(false);

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
      <button
        onClick={handleBack}
        style={{
          ...styles.backButton,
          backgroundColor: isHovered ? "#000" : "transparent",
          color: isHovered ? "white" : "#000",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      <FaArrowLeft size={18} />
      </button>

      <h1 style={styles.title}>Sosyal Medyalarımız</h1>
      <p style={styles.subtitle}>
        En son haberler, etkinlikler ve içerikler için bize katılın!
      </p>

      <div style={styles.socialContainer}>
        <a
          href="https://instagram.com/ACTQ.Quimper"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.socialButton, backgroundColor: "#E1306C" }}
        >
          <FaInstagram size={40} />
          <span style={styles.widgetText}>Instagram</span>
        </a>
        <a
          href="https://youtube.com/@ACTQ.Quimper"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.socialButton, backgroundColor: "#FF0000" }}
        >
          <FaYoutube size={40} />
          <span style={styles.widgetText}>YouTube</span>
        </a>
        <a
          href="https://facebook.com/ACTQ.Quimper"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.socialButton, backgroundColor: "#1877F2" }}
        >
          <FaFacebook size={40} />
          <span style={styles.widgetText}>Facebook</span>
        </a>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    background: "linear-gradient(to right,rgb(255, 188, 241),rgb(192, 236, 255))",
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
  },
  title: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "10px",
    textShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
  },
  subtitle: {
    fontSize: "18px",
    color: "#444",
    marginBottom: "30px",
  },
  socialContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
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
  },
  widgetText: {
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "8px",
  },
  backButton: {
    backgroundColor: "transparent",
    border: "2px solid rgb(0, 0, 0)",
    padding: "12px 20px",
    fontSize: "18px",
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
  },
};
