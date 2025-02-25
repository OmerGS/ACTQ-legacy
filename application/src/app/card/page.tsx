"use client";

import { useEffect, useState } from "react";

export default function Card() {
  const [membre, setMembre] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchedMembre = localStorage.getItem("user");
    if (fetchedMembre) {
      const membreObj = JSON.parse(fetchedMembre);
      console.log(membreObj);
      setMembre(membreObj.member);
    }
    setLoading(false);
  }, []);

  return (
    <div style={styles.container}>
      {loading ? (
        <p style={styles.loading}>Üye bilgileri indiriliyor...</p>
      ) : membre ? (
        <div style={styles.card}>
          {/* Association Logo */}
          <img src="/assets/logo/actq.png" alt="Association Logo" style={styles.logo} />

          {/* Member's Name */}
          <h2 style={styles.name}>
            {membre.prenom + " " + membre.nom}
          </h2>

          {/* Barcode (Placeholder) */}
          <div style={styles.barcode}>
            <p style={styles.barcodeText}>| || | | | | || || | | | ||</p> {/* Example Barcode */}
          </div>

          {/* Lale Flower (Turkish Tulip) Symbol with opacity */}
          <div style={styles.lale}>
            <img src="/path-to-lale-flower.png" alt="Lale Flower" style={styles.laleFlower} />
          </div>
        </div>
      ) : (
        <div style={styles.card}>
          <h2>Hesabınızı oluşturmanız gerekiyor</h2>
          <p>Bu sayfaya erişmek için önce telefon numaranızı doğrulamanız gerekmektedir.</p>
          <p>Lütfen telefon numaranızı doğrulayın ve ardından hesap oluşturma sayfasına geçiş yapın.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundImage: "url('/assets/images/paysage.jpg')", // Background image
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "absolute" as "absolute",
    width: "100vw", // Full width
    height: "100vh", // Full height
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    filter: "brightness(0.4)", // Optional: darkens the background for better contrast
  },
  card: {
    background: "linear-gradient(135deg, #e63946, #ffbc42)", // Red gradient with warm gold
    borderRadius: "20px", // Rounded corners
    padding: "30px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)", // Soft shadow
    position: "relative" as "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as "column",
    zIndex: 10,
    transformOrigin: "center", // Keep the rotation centered
    overflow: "hidden",
    color: "#fff", // White text for the card
    textAlign: "center" as "center",
    width: "80vw", // Set to 80% of the screen width
    height: "80vh", // Set to 80% of the screen height
    margin: "10vh auto", // Center the card and add vertical margin for spacing
    transform: "rotate(0deg)", // Default rotation
  },
  logo: {
    width: "80px",
    height: "auto",
    marginBottom: "20px",
  },
  name: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "15px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    animation: "fadeIn 1s ease-in-out",
  },
  barcode: {
    width: "100%",
    height: "40px",
    border: "1px solid #fff", // White border for the barcode
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    background: "transparent",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)", // Light white shadow for the barcode
  },
  barcodeText: {
    fontFamily: "monospace",
    fontSize: "18px",
    color: "#fff",
  },
  loading: {
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
  },
  lale: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  laleFlower: {
    width: "120px", // Adjust flower size
    height: "auto",
    opacity: 0.3, // Slight opacity
    transform: "scale(1.1)", // Slight scaling effect
  },
};
