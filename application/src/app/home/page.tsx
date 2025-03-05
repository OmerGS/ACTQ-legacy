"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/reusable/Navbar";
import { FaUsersCog, FaUser, FaHandHoldingUsd } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { useMembre } from "../hooks/MemberContext";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useAuth();
  const { membre } = useMembre();
  const [flash, setFlash] = useState(false);
  const [countdown, setCountdown] = useState<string>("");

  const injectKeyframes = () => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes flash {
        0% {
          opacity: 1;
          color: #E30A17;
        }
        50% {
          opacity: 0.5;
          color: #ff4757;
        }
        100% {
          opacity: 1;
          color: #E30A17;
        }
      }
    `;
    document.head.appendChild(style);
  };

  useEffect(() => {
    injectKeyframes();

    const updateCountdown = () => {
      //const now = new Date("2025-07-32T00:00:00");
      const now = new Date();
      const currentYear = now.getFullYear();
      let targetDate = new Date(`${currentYear}-07-31T00:00:00`);
      
      if (now > targetDate) {
        targetDate = new Date(`${currentYear + 1}-07-31T00:00:00`);
      }

      const timeDiff = targetDate.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        setCountdown("00:00:00:00");
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 3600 * 24));
      const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
      const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setCountdown(`${days}j ${hours}h ${minutes}m ${seconds}s`);

      if (days <= 14) {
        setFlash(true);
      } else {
        setFlash(false);
      }
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.appContainer}>
        <p style={styles.welcomeText}>
          Merhaba <span style={styles.highlight}>{membre.prenom} {membre.nom}</span>
        </p>

        {/* Add Son aidat ödeme tarihi and the countdown */}
        <div style={styles.countdownContainer}>
          <p style={styles.countdownText}>Aidat son ödeme tarihine kalan süre</p>
          <p style={flash ? styles.countdownValueFlash : styles.countdownValue}>
            {countdown}
          </p>
        </div>

        <div style={styles.cardsContainer}>
          <div style={styles.card} onClick={() => router.push("/conseil-administration")}>
            <FaUsersCog size={38} color="#4682B4" style={styles.icon} />
            <span style={styles.cardText}>Yönetim Kurulu</span>
          </div>
          <div style={styles.card} onClick={() => router.push("/uyeligim")}>
            <FaUser size={38} color="#8A2BE2" style={styles.icon} />
            <span style={styles.cardText}>Dernek Üyeliğim</span>
          </div>
          <div style={styles.card} onClick={() => router.push("/")}>
            <FaHandHoldingUsd size={38} color="#FFD700" style={styles.icon} />
            <span style={styles.cardText}>Cenaze Fonu Üyeliğim</span>
          </div>
        </div>
      </div>

      <Navbar />
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
  countdownContainer: {
    width: "100%",
    maxWidth: "350px",
    padding: "5px",
    borderRadius: "12px",
    backgroundColor: "#f4f4f4",
    boxShadow: "2px 2px 8px rgba(102, 102, 102, 0.1)", 
    margin: "0 auto",
    display: "flex",
    flexDirection: "column", 
    alignItems: "center", 
    justifyContent: "center",
    boxSizing: "border-box",
  } as React.CSSProperties,   
  countdownText: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "5px",
    fontWeight: "600",
  },
  countdownValue: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#E30A17",
    letterSpacing: "0.5px",
  },
  countdownValueFlash: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#E30A17",
    letterSpacing: "0.5px",
    animation: "flash 1s infinite", 
  },
};