"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft, FaUsers, FaUserPlus, FaCloudUploadAlt, FaCashRegister, FaCreditCard, FaPen, FaClock, FaMoneyBill, FaEuroSign, FaCalendar, FaCheckDouble, FaCheckCircle } from "react-icons/fa";
import { useMembre } from "../../hooks/MemberContext";
import Unauthorized from '@/components/reusable/Unauthorized';
import { motion } from "framer-motion";

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
            <motion.button
              style={styles.backButton}
              onClick={() => router.push("/home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.05 }}
            >
              <FaArrowLeft size={18} style={styles.backIcon} /> Geri
            </motion.button>

            <div style={styles.headerContainer}>
              <h2 style={styles.welcomeTitle}>
                Merhaba, <span style={styles.highlight}>{membre.prenom}</span> 👋
              </h2>
              <p style={styles.roleText}>
                Güncel Rolünüz <span style={styles.roleHighlight}>{membre.specialRole}</span>
              </p>
            </div>

            <div style={styles.cardsContainer}>
              {/* Carte pour les administrateurs uniquement */}
              {isAdmin && (
                <motion.div
                  style={{ ...styles.card, backgroundColor: "#8B0000", borderWidth: 3, borderColor: "#C02917" }}
                  onClick={() => router.push("/panel/uye/list")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.45 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaUsers size={38} color="#FFF" style={styles.icon} />
                  <span style={styles.cardText}>Üye Listesi</span>
                </motion.div>
              )}

              {(isAdmin || isModerator) && (
                <motion.div
                  style={{ ...styles.card, backgroundColor: "#C02917", borderWidth: 3, borderColor: "#8B0000" }}
                  onClick={() => router.push("/panel/uye/new")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.45 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaClock size={38} color="#FFF" style={styles.icon} />
                  <span style={styles.cardText}>Son Eklenen Üyeler</span>
                </motion.div>
              )}

              {isAdmin && (
                <div style={styles.cardsContainer}>
                  <motion.div
                    style={{ ...styles.card, backgroundColor: "#F24A33", borderWidth: 3, borderColor: "#D1352B" }}
                    onClick={() => router.push("/panel/uye/add")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaUserPlus size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Üye Ekle</span>
                  </motion.div>

                  <motion.div
                    style={{ ...styles.card, backgroundColor: "#FF725F", borderWidth: 3, borderColor: "#D1352B" }}
                    onClick={() => router.push("/panel/makbuz-check")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaCheckCircle size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Makbuz Dogrula</span>
                  </motion.div>

                  <motion.div
                    style={{ ...styles.card, backgroundColor: "#FBB13C", borderWidth: 3, borderColor: "#D48A2B" }}
                    onClick={() => router.push("/panel/editAidat")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaPen size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Aidat Fiyatı Düzenle</span>
                  </motion.div>

                  <motion.div
                    style={{ ...styles.card, backgroundColor: "#DDAB5A", borderWidth: 3, borderColor: "#D48A2B" }}
                    onClick={() => router.push("/panel/generate")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaCalendar size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Yeni Yıl Fiyatları</span>
                  </motion.div>

                  <motion.div
                    style={{ ...styles.card, backgroundColor: "#d1c700", borderWidth: 3, borderColor: "#DDAB5A" }}
                    onClick={() => router.push("/panel/uye/aidat")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaMoneyBill size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Aidatlar</span>
                  </motion.div>

                  <motion.div
                    style={{ ...styles.card, backgroundColor: "#9ECD52", borderWidth: 3, borderColor: "#4CAF50" }}
                    onClick={() => router.push("/panel/uye/funeral-found")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaEuroSign size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Cenaze Fonu</span>
                  </motion.div>

                  <motion.div
                    style={{ ...styles.card, backgroundColor: "#4CAF50", borderWidth: 3, borderColor: "#388E3C" }}
                    onClick={() => router.push("/panel/payments/list")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaCashRegister size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Ödemeler</span>
                  </motion.div>
                </div>
              )}

              {/* Carte pour les administrateurs et modérateurs */}
              {(isAdmin || isModerator) && (
                <div style={styles.cardsContainer}>
                  <motion.div
                    style={{ ...styles.card, backgroundColor: "#0D7377", borderWidth: 3, borderColor: "#006F66" }}
                    onClick={() => router.push("/panel/payments/add")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaCreditCard size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Ödeme Ekle</span>
                  </motion.div>

                  <motion.div
                    style={{ ...styles.card, backgroundColor: "#005B8C", borderWidth: 3, borderColor: "#004C77" }}
                    onClick={() => router.push("/panel/payments/edit")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaCloudUploadAlt size={38} color="#FFF" style={styles.icon} />
                    <span style={styles.cardText}>Son Eklediğim Ödemeler</span>
                  </motion.div>
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
    backgroundColor: "#f9f9f9",
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
    maxWidth: "500px",
    padding: "20px",
    textAlign: "left",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  } as React.CSSProperties,
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#FF4B5C",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
    transition: "background-color 0.3s ease",
  } as React.CSSProperties,
  backIcon: {
    marginRight: "8px",
  },
  headerContainer: {
    textAlign: "center",
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#e8eff1",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  } as React.CSSProperties,
  welcomeTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "8px",
  } as React.CSSProperties,
  highlight: {
    color: "#F24A33",
    fontWeight: "bold",
  } as React.CSSProperties,
  roleText: {
    fontSize: "20px",
    color: "#555",
  } as React.CSSProperties,
  roleHighlight: {
    fontSize: "21px",
    fontWeight: "bold",
    color: "#007bff",
  } as React.CSSProperties,  
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  } as React.CSSProperties,
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "15px",
    borderRadius: "12px",
    color: "#FFF",
    fontSize: "18px",
    fontWeight: "bold",
    border: "2px solid transparent",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    boxSizing: "border-box",
  } as React.CSSProperties,
  cardText: {
    flex: 1,
    textAlign: "center",
    fontSize: "20px",
  } as React.CSSProperties,
  icon: {
    marginRight: "15px",
  },
};