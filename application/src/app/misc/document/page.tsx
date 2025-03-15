"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/reusable/Navbar";
import { useMembre } from "../../hooks/MemberContext";
import { FaArrowLeft, FaBalanceScale, FaUsers } from "react-icons/fa";
import { useEffect } from "react";
import Unauthorized from '@/components/reusable/Unauthorized';

export default function Document() {
  const router = useRouter();
  const { membre } = useMembre();

  useEffect(() => {
    document.body.style.backgroundColor = "#f9f9f9"; 
    document.body.style.color = "#333";
  }, []);

  if (!membre) {
    return (
      <Unauthorized></Unauthorized>
    )
  }

  return (
    
    <div style={styles.pageContainer}>
        <div style={styles.buttonContainer}>
                <button
                  style={styles.backButton}
                  onClick={() => router.back()}
                >
                  <FaArrowLeft size={18} /> Geri
                </button>
              </div>

      <h1 style={styles.title}>Dokümanler</h1>

      {/* Grille des widgets */}
      <div style={styles.gridContainer}>

        <button style={{ ...styles.widget, borderColor: "#FF6347", borderWidth: 2, borderStyle: "solid", }} 
              onClick={async () => { router.push('/soon'); }}
        >
          <FaUsers  size={38} style={{ ...styles.icon, color: "#FF6347" }} />
          <p style={styles.widgetText}>Üye Formu</p>
        </button>

        <button style={{ ...styles.widget, borderColor: "#4CAF50", borderWidth: 2, borderStyle: "solid", }} 
                onClick={async () => { router.push('/soon')}}
        >
          <FaBalanceScale size={38} style={{ ...styles.icon, color: "#4CAF50" }} />
          <p style={styles.widgetText}>Tüzük</p>
        </button> 
      </div>

      <Navbar />
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: "#f9f9f9",
    color: "#333",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: "100px",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Nunito', sans-serif",
    boxSizing: "border-box",
    textAlign: "center",
  } as React.CSSProperties,
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#FF4B5C",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
    transition: "background-color 0.3s ease",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "20px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "15px",
    width: "100%",
    maxWidth: "600px",
  },
  widget: {
    backgroundColor: "#ffffff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  icon: {
    marginBottom: "10px",
  },
  widgetText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#222",
  },
};