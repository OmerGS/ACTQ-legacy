"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/reusable/Navbar";
import { FaIdCard, FaUsersCog } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import Spinner from "@/components/reusable/Spinner";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useAuth();
  const [membre, setMembre] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchedMembre = localStorage.getItem("user");
      if (fetchedMembre) {
        const membreObj = JSON.parse(fetchedMembre);
        setMembre(membreObj.member);
      }
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.appContainer}>
        <p style={styles.welcomeText}>
          Merhaba <span style={styles.highlight}>{membre.prenom} {membre.nom}</span>
        </p>

        <div style={styles.cardsContainer}>
          <div style={styles.card} onClick={() => router.push("/card")}>
            <FaIdCard size={38} color="#E30A17" style={styles.icon} />
            <span style={styles.cardText}>Üye Kartı</span>
          </div>
          <div style={styles.card} onClick={() => router.push("/conseil-administration")}>
            <FaUsersCog size={38} color="#1E90FF" style={styles.icon} />
            <span style={styles.cardText}>Yönetim Kurulu</span>
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
  },
  appContainer: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    textAlign: "left",
  },
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
  },
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
  },
  cardText: {
    flex: 1,
    textAlign: "center",
    fontSize: "20px",
  },
  icon: {
    marginRight: "10px",
  },
};