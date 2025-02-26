"use client";

import { useEffect, useState, useRef } from "react";
import JsBarcode from "jsbarcode";
import Spinner from "@/components/reusable/Spinner";

export default function Card() {
  const [membre, setMembre] = useState<any>(null);
  const [cardBackground, setCardBackground] = useState<string>("");
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const fetchedMembre = localStorage.getItem("user");
    if (fetchedMembre) {
      const membreObj = JSON.parse(fetchedMembre);
      setMembre(membreObj.member);
    }
  }, []);

  useEffect(() => {
    const backgrounds = [
      "/assets/images/card-background/background1.jpg",
      "/assets/images/card-background/background2.jpg",
      "/assets/images/card-background/background3.jpg",
      "/assets/images/card-background/background4.jpg",
      "/assets/images/card-background/background5.jpg",
      "/assets/images/card-background/background6.jpg",
    ];

    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setCardBackground(randomBackground);
  }, []);

  useEffect(() => {
    if (membre && membre.barcode && barcodeRef.current) {
      JsBarcode(barcodeRef.current, membre.barcode, {
        format: "CODE128",
        displayValue: true, 
        lineColor: "#fff",
        width: 3,
        height: 80,
        background: "transparent",
      });
    }
  }, [membre]);

  if (!membre) {
    return <Spinner />;
  }

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${cardBackground})` }}>
      <div style={styles.card}>
        {/* Bouton de retour */}
        <button onClick={handleBack} style={styles.backButton}>←</button>

        {/* Logo */}
        <img src="/assets/logo/actq.png" alt="Association Logo" style={styles.logo} />

        {/* Nom du membre */}
        <h2 style={styles.name}>
          {membre.prenom + " " + membre.nom}
        </h2>

        {/* Code-barres */}
        <div style={styles.barcode}>
          <svg ref={barcodeRef}></svg>
        </div>

        {/* Motif décoratif */}
        <div style={styles.overlay}></div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "absolute" as "absolute",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontFamily: "'Nunito', sans-serif",
  },
  card: {
    background: "linear-gradient(135deg, rgba(255, 45, 63, 0.33), rgba(71, 61, 255, 0.4))",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
    position: "relative" as "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as "column",
    zIndex: 10,
    overflow: "hidden",
    color: "#fff",
    textAlign: "center" as "center",
    width: "80vw",
    height: "80vh",
    margin: "10vh auto",
    backdropFilter: "blur(7px)",
  },
  overlay: {
    position: "absolute" as "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.2,
    zIndex: 1,
    top: 0,
    left: 0,
  },
  logo: {
    width: "120px", 
    height: "auto",
    marginBottom: "30px",
    zIndex: 2,
  },
  name: {
    fontSize: "28px", 
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "20px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    zIndex: 2,
  },
  barcode: {
    width: "100%",
    height: "80px", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30px", 
    zIndex: 2,
  },
  backButton: {
    position: "absolute" as "absolute",
    top: "20px",
    left: "20px",
    background: "rgba(0, 0, 0, 0.4)", 
    color: "#fff",
    border: "none",
    borderRadius: "25px", 
    fontSize: "16px",
    padding: "8px 16px", 
    cursor: "pointer",
    transition: "all 0.3s ease-in-out", 
    zIndex: 2,
    fontWeight: "500", 
    textTransform: "uppercase",
  },
};