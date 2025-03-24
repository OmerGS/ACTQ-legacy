"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from "@/components/reusable/Spinner";
import { FaArrowLeft } from 'react-icons/fa';

const YönetimKurulu = () => {
  const [üyeler, setÜyeler] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/assets/json/administration-members.json')
      .then(response => response.json())
      .then(data => setÜyeler(data))
      .catch(error => console.error("Erreur lors du chargement des membres", error));
  }, []);

  const handleBack = () => {
    router.back();
  };

  if (!üyeler) {
    return <Spinner />;
  }

  const styles = {
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      backgroundColor: "#ff5c5c",
      color: "white",
      border: "none",
      padding: "12px 18px",
      borderRadius: "25px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "500",
      transition: "background-color 0.3s ease",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
      position: "absolute",
      top: "10px",
      left: "10px",
      zIndex: 10,
    } as React.CSSProperties,
    fleche: {
      fontSize: '30px',
      color: 'white',
    },
    container: {
      padding: "40px",
      fontFamily: "Roboto, sans-serif",
      backgroundColor: "#f9fafb",
      color: "#333",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
    } as React.CSSProperties,
    title: {
      marginTop: "50px",
      marginBottom: "50px",
      fontSize: "2.5rem",
      color: "#333",
      fontWeight: "bold",
      textAlign: "center",
      letterSpacing: "1px",
    } as React.CSSProperties,
    membersContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "20px",
      width: "100%",
    },
    memberCard: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      padding: "30px",
      textAlign: "center",
      fontSize: "1.1rem",
      color: "#333",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      position: "relative",
      overflow: "hidden",
    } as React.CSSProperties,
    memberCardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
    },
    roleName: {
      fontSize: "1.4rem",
      color: "#e74c3c",
      fontWeight: "bold",
      marginBottom: "15px",
      letterSpacing: "0.5px",
    },
    memberName: {
      fontSize: "1.2rem",
      color: "#333",
      fontWeight: "500",
      marginBottom: "12px",
      letterSpacing: "0.5px",
      textTransform: "capitalize",
    } as React.CSSProperties,
    memberNameContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
    } as React.CSSProperties,
    cardBorder: {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      background: "linear-gradient(145deg, #ff5c5c, #ff7f7f)",
      zIndex: -1,
      borderRadius: "12px",
      opacity: 0.15,
    } as React.CSSProperties,
  };

  return (
    <div style={styles.container}>
      <div onClick={handleBack} style={styles.backButton}>
        <FaArrowLeft style={styles.fleche} />
      </div>

      <h1 style={styles.title}>Yönetim Kurulu</h1>

      <div style={styles.membersContainer}>
        {Object.keys(üyeler).map((görev, index) => {
          const role = üyeler[görev];
          return (
            <div
              key={index}
              style={{ ...styles.memberCard, ...styles.memberCardHover }}
            >
              <div style={styles.roleName}>{görev}</div>
              <div style={styles.memberNameContainer}>
                {role.isimler.map((isim: string, subIndex: number) => (
                  <div key={subIndex} style={styles.memberName}>
                    {isim}
                  </div>
                ))}
              </div>
              <div style={styles.cardBorder} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YönetimKurulu;