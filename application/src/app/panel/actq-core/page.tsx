"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft, FaUser, FaHandHoldingUsd, FaCreditCard } from "react-icons/fa";
import { useMembre } from "../../hooks/MemberContext";
import Unauthorized from '@/components/reusable/Unauthorized';

export default function AdminPanel() {
  const router = useRouter();
  const { membre } = useMembre();

  const isAdmin = membre?.specialRole === "Administrator";
  const isModerator = membre?.specialRole === "Moderator";

  return (
    <div style={styles.pageContainer}>
      <div style={styles.appContainer}>
        {membre?.specialRole ? (
          <>
            <button style={styles.backButton} onClick={() => router.push("/home")}>
              <FaArrowLeft size={18} style={styles.backIcon} /> Geri
            </button>

            <div style={styles.headerContainer}>
              <h2 style={styles.welcomeTitle}>
                Merhaba, <span style={styles.highlight}>{membre.prenom}</span> 👋
              </h2>
              <p style={styles.roleText}>
                Güncel Rolunuz <span style={styles.roleHighlight}>{membre.specialRole}</span>
              </p>
            </div>

            <div style={styles.cardsContainer}>
              {/* Carte pour les administrateurs uniquement */}
              {isAdmin && (
                <div style={styles.cardsContainer}>
                  <div style={{ ...styles.card, borderColor: "#E30A17", borderWidth: 2 }} onClick={() => router.push("/panel/memberList")}>
                    <FaUser size={38} color="#E30A17" style={styles.icon} />
                    <span style={styles.cardText}>Üye Listesi</span>
                  </div>

                  <div style={{ ...styles.card, borderColor: "#E30A17", borderWidth: 2 }} onClick={() => router.push("/soon")}>
                    <FaUser size={38} color="#E30A17" style={styles.icon} />
                    <span style={styles.cardText}>Üye Ekle</span>
                  </div>

                  <div style={{ ...styles.card, borderColor: "#E30A17", borderWidth: 2 }} onClick={() => router.push("/soon")}>
                    <FaUser size={38} color="#E30A17" style={styles.icon} />
                    <span style={styles.cardText}>Aidat Fiyati Düzenle</span>
                  </div>

                  <div style={{ ...styles.card, borderColor: "#E30A17", borderWidth: 2 }} onClick={() => router.push("/soon")}>
                    <FaUser size={38} color="#E30A17" style={styles.icon} />
                    <span style={styles.cardText}>Ödemeler</span>
                  </div>
                </div>
              )}

              {/* Carte pour les modérateurs uniquement */}
              {isModerator && (
                <div style={{ ...styles.card, borderColor: "#32CD32", borderWidth: 2 }} onClick={() => router.push("/soon")}>
                  <FaHandHoldingUsd size={38} color="#32CD32" style={styles.icon} />
                  <span style={styles.cardText}>Üye Aidatlari</span>
                </div>
              )}

              {/* Carte pour les administrateurs et modérateurs */}
              {(isAdmin || isModerator) && (
                <div style={{ ...styles.card, borderColor: "#007BFF", borderWidth: 2 }} onClick={() => router.push("/soon")}>
                  <FaCreditCard size={38} color="#007BFF" style={styles.icon} />
                  <span style={styles.cardText}>Ödeme Ekle</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <Unauthorized />
        )}
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
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "15px",
    transition: "background-color 0.2s ease",
  } as React.CSSProperties,
  backIcon: {
    marginRight: "5px",
  },
  headerContainer: {
    textAlign: "center",
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  } as React.CSSProperties,
  welcomeTitle: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  } as React.CSSProperties,
  highlight: {
    color: "#e63946",
    fontWeight: "bold",
  } as React.CSSProperties,
  roleText: {
    fontSize: "18px",
    color: "#555",
  } as React.CSSProperties,
  roleHighlight: {
    fontSize: "19px",
    fontWeight: "bold",
    color: "#007bff",
  } as React.CSSProperties,  
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