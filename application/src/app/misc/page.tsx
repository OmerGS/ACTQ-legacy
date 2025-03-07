"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/reusable/Navbar";
import { useMembre } from "../hooks/MemberContext";
import { FaUsersCog, FaUsers, FaBullhorn, FaClipboardList, FaUserSecret } from "react-icons/fa";
import { useEffect } from "react";
import Unauthorized from '@/components/reusable/Unauthorized';

export default function Misc() {
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
      <h1 style={styles.title}>Hizmetler</h1>

      {/* Grille des widgets */}
      <div style={styles.gridContainer}>
        <button style={styles.widget} onClick={async () => { router.push('/conseil-administration') }}>
          <FaUsersCog size={38} style={{ ...styles.icon, color: "#FF6347" }} />
          <p style={styles.widgetText}>Yönetim Kurulu</p>
        </button>

        <button style={styles.widget} onClick={async () => { router.push('/sosyal-medya')}}>
          <FaUsers size={38} style={{ ...styles.icon, color: "#4CAF50" }} />
          <p style={styles.widgetText}>Sosyal Medyalar</p>
        </button>

        <button style={styles.widget} onClick={async () => { router.push('/soon') }}>
          <FaBullhorn size={38} style={{ ...styles.icon, color: "#FFC107" }} />
          <p style={styles.widgetText}>Duyuru ve Haber</p>
        </button>

        <button style={styles.widget} onClick={async () => { router.push('/guncellemeler')}}>
          <FaClipboardList size={38} style={{ ...styles.icon, color: "#B317D3" }} />
          <p style={styles.widgetText}>Güncellemeler</p>
        </button>

        {(membre.specialRole === "Administrator" || membre.specialRole === "Moderator") && (
          <button style={styles.widget}>
            <FaUserSecret size={38} style={{ ...styles.icon, color: "#9C27B0" }} />
            <p style={styles.widgetText}>Yönetici Paneli</p>
          </button>
        )}
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