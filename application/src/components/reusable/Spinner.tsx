"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";

export default function Home() {
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
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.spinner}></div>
      </div>
    );
  }
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
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", // Centrer l'élément
    backgroundColor: "#ffffff",
  },
  spinner: {
    border: "8px solid #f3f3f3", /* Gris clair */
    borderTop: "8px solid #3498db", /* Couleur bleue */
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 2s linear infinite", /* Animation ici */
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
