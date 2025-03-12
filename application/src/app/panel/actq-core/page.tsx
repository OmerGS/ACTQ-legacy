"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft, FaUsers, FaUserPlus, FaMoneyBillWave, FaCashRegister, FaCreditCard, FaPen } from "react-icons/fa";
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
                  <div style={{ ...styles.card, backgroundColor: "#E30A17", borderWidth: 3, borderColor: "#C02917" }} onClick={() => router.push("/panel/uye/list")}>
                    <FaUsers size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Üye Listesi</span>
                  </div>

                  <div style={{ ...styles.card, backgroundColor: "#F24A33", borderWidth: 3, borderColor: "#D1352B" }} onClick={() => router.push("/panel/uye/add")}>
                    <FaUserPlus size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Üye Ekle</span>
                  </div>

                  <div style={{ ...styles.card, backgroundColor: "#FBB13C", borderWidth: 3, borderColor: "#D48A2B" }} onClick={() => router.push("/panel/editAidat")}>
                    <FaMoneyBillWave size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Aidat Fiyatı Düzenle</span>
                  </div>

                  <div style={{ ...styles.card, backgroundColor: "#0066CC", borderWidth: 3, borderColor: "#004A99" }} onClick={() => router.push("/panel/payments/list")}>
                    <FaCashRegister size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Ödemeler</span>
                  </div>
                </div>
              )}

              {/* Carte pour les administrateurs et modérateurs */}
              {(isAdmin || isModerator) && (
                <div style={styles.cardsContainer}>
                  <div style={{ ...styles.card, backgroundColor: "#0056B3", borderWidth: 3, borderColor: "#004194" }} onClick={() => router.push("/panel/payments/add")}>
                    <FaCreditCard size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Ödeme Ekle</span>
                  </div>

                  <div style={{ ...styles.card, backgroundColor: "#005B8C", borderWidth: 3, borderColor: "#004C77" }} onClick={() => router.push("/panel/payments/edit")}>
                    <FaPen size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Son Eklediğim Ödemeler</span>
                  </div>

                  <div style={{ ...styles.card, backgroundColor: "#005B8C", borderWidth: 3, borderColor: "#004C77" }} onClick={() => router.push("/panel/uye/new")}>
                    <FaPen size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Son Eklenen Üyeler</span>
                  </div>
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
    backgroundColor: "#D9534F",
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
  } as React.CSSProperties,
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "100%",
    padding: "15px",
    borderRadius: "14px",
    color: "#FFF",
    fontSize: "18px",
    fontWeight: "bold",
    border: "2px solid #111",
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