"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/reusable/Navbar";
import Spinner from "@/components/reusable/Spinner";

export default function Settings() {
  const router = useRouter();
  const [membre, setMembre] = useState<any>(null);

  useEffect(() => {
    const fetchedMembre = localStorage.getItem("user");
    if (fetchedMembre) {
      const membreObj = JSON.parse(fetchedMembre);
      setMembre(membreObj.member);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!membre) {
    return <Spinner />;
  }

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Paramètres</h1>

      <button onClick={handleLogout} style={styles.logoutButton}>
        Se Déconnecter
      </button>

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
    boxSizing: "border-box",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "12px 24px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  logoutButtonHover: {
    backgroundColor: "#e60000",
  },
};