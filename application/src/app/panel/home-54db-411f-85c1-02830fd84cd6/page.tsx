"use client";

import { FaMoneyBillWave , FaUsersCog, FaUser, FaHandHoldingUsd } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div style={styles.pageContainer}>
      <div style={styles.appContainer}>
        <p style={styles.welcomeText}>
          Merhaba <span style={styles.highlight}> Yönetici</span>
        </p>

        <div style={styles.cardsContainer}>
          <div style={styles.card} onClick={() => router.push("/conseil-administration")}>
            <FaUsersCog size={38} color="#4682B4" style={styles.icon} />
            <span style={styles.cardText}>Yönetim Kurulu</span>
          </div>
          <div style={styles.card} onClick={() => router.push("/panel/uyeler-528a-4e28-8dd6-648611094ebf")}>
            <FaUser size={38} color="#8A2BE2" style={styles.icon} />
            <span style={styles.cardText}>Dernek Üyeleri</span>
          </div>
          <div style={styles.card} onClick={() => router.push("/panel/cenaze-fonu-5b41-4bac-b919-0ed4c53cf4b3")}>
            <FaHandHoldingUsd size={38} color="#FFD700" style={styles.icon} />
            <span style={styles.cardText}>Cenaze Fonu Üyeleri</span>
          </div>
          <div style={styles.card} onClick={() => router.push("/panel/odeme-635c-47a4-a5fd-96418ce909e6")}>
            <FaMoneyBillWave size={38} color="#32CD32" style={styles.icon} />
            <span style={styles.cardText}>Ödeme Ekleyin</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Nunito', sans-serif",
  } as React.CSSProperties,
  appContainer: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    textAlign: "left",
  } as React.CSSProperties,
  welcomeText: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
  },
  highlight: {
    color: "#ff4757",
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  } as React.CSSProperties,
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "100%",
    padding: "15px",
    borderRadius: "14px",
    backgroundColor: "#fff",
    color: "#333",
    fontSize: "18px",
    fontWeight: "bold",
    border: "2px solid #ddd",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box",
  } as React.CSSProperties,
  cardText: {
    flex: 1,
    textAlign: "center",
    fontSize: "20px",
  } as React.CSSProperties,
  icon: {
    marginRight: "10px",
  },
};