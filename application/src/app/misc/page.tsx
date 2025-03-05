"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/reusable/Navbar";
import Spinner from "@/components/reusable/Spinner";
import { useMembre } from "../hooks/MemberContext";
import { FaCog, FaUsers, FaBullhorn, FaUniversity, FaUserSecret } from "react-icons/fa";

export default function Misc() {
  const router = useRouter();
  const { membre } = useMembre();

  if (!membre) {
    return <Spinner />;
  }

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Miscellaneous</h1>

      {/* Grille des widgets */}
      <div style={styles.gridContainer}>
        <button style={styles.widget} onClick={async () => { router.push('/conseil-administration') }}>
          <FaCog size={24} style={{ ...styles.icon, color: "#FF6347" }} />
          <p style={styles.widgetText}>Yönetim Kurulu</p>
        </button>

        <button style={styles.widget}>
          <FaUsers size={24} style={{ ...styles.icon, color: "#4CAF50" }} />
          <p style={styles.widgetText}>Sosyal Medyalar</p>
        </button>

        <button style={styles.widget}>
          <FaBullhorn size={24} style={{ ...styles.icon, color: "#FFC107" }} />
          <p style={styles.widgetText}>Duyuru ve Haber</p>
        </button>

        <button style={styles.widget}>
          <FaUniversity size={24} style={{ ...styles.icon, color: "#2196F3" }} />
          <p style={styles.widgetText}>Dernek</p>
        </button>

        {(membre.specialRole === "Administrator" || membre.specialRole === "Moderator") && (
          <button style={styles.widget}>
            <FaUserSecret size={24} style={{ ...styles.icon, color: "#9C27B0" }} />
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