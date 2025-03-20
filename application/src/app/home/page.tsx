"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/reusable/Navbar";
import { FaUser, FaHandHoldingUsd, FaCreditCard } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { useMembre } from "../hooks/MemberContext";
import Unauthorized from '@/components/reusable/Unauthorized';
import ServerConnection from "@/components/api/ServerConnection";
import Confetti from 'react-confetti';
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const { membre } = useMembre();
  const isAuthenticated = useAuth();
  const [flash, setFlash] = useState(false);
  const [countdown, setCountdown] = useState<string>("");
  const [importantMessage, setImportantMessage] = useState<string>("");
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isInTop, setIsInTop] = useState<boolean>(false);
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const [numPieces, setNumPieces] = useState(500);

  const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

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
    const fetchData = async () => {
      injectKeyframes();

      if (membre) {
        try {
          
          const response = await ServerConnection.membrePaidAllAidat(membre.barcode);
          const confettiShown = sessionStorage.getItem("confettiShown");

            if (response.isPaid) {
              setIsPaid(true);
            } else {
              setIsPaid(false);
            }

            if (response.isInTop) {
              setIsInTop(true);

              sessionStorage.setItem("confettiShown", "true");
              if (!confettiShown) {
                setIsConfettiVisible(true);
              }
            }

            setTimeout(() => {
              setNumPieces(0); 
            }, 4500);

            setTimeout(() => {
              setIsConfettiVisible(false);
            }, 6500);

        } catch (error) {
          console.error("Erreur lors de la vérification du paiement :", error);
          setIsPaid(false);
        }
      }

      if (!isPaid) {
        const updateCountdown = () => {
          const now = new Date();
          //const now = new Date("2025-08-01T00:00:00");

          const currentYear = now.getFullYear();
          let targetDate = new Date(`${currentYear}-07-31T23:59:59`);
        
          if (now > targetDate) {
            setCountdown("00:00:00:00");
            setImportantMessage("Geç kaldınız ! Üyelik ve cenaze fonundan düşeceksiniz !!!")
            setFlash(true);
            return;
          }
        
          const timeDiff = targetDate.getTime() - now.getTime();
        
          const days = Math.floor(timeDiff / (1000 * 3600 * 24));
          const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
          const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
          setCountdown(`${days}j ${hours}h ${minutes}m ${seconds}s`);
        
          setFlash(days <= 14);
        };
        
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);        
      }
    };

    fetchData();
  }, [membre, isPaid]);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.appContainer}>
        {membre ? (
          <>
            {isConfettiVisible && (
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                numberOfPieces={numPieces}
                recycle={false} 
                gravity={randomRange(0.1, 0.4)}
                wind={randomRange(0.01, 0.12)} 
              />
            )}

            <p style={styles.welcomeText}>
              Merhaba <span style={styles.highlight}>{membre.prenom} {membre.nom}</span>
            </p>

            {isInTop ? (
              <div style={styles.countdownContainer}>
                <p style={styles.countdownText}>Tebrikler !<br></br>Aidatınızı ödeyen ilk üyelerdensiniz !🎉</p>
              </div>
            ) : isPaid ? (
              <div style={styles.countdownContainer}>
                <p style={styles.countdownText}>Bu yıl için tüm aidatınızı ödediniz.</p>
              </div>
            ) : (
              <div style={styles.countdownContainer}>
                <p style={styles.countdownText}>Aidat son ödeme tarihine kalan süre</p>
                <p style={flash ? styles.countdownValueFlash : styles.countdownValue}>
                  {countdown}
                  <br></br>
                  {importantMessage}
                </p>
              </div>
            )}

            <div style={styles.logoBackground}></div>

            <div style={styles.cardsContainer}>
              <motion.div style={{...styles.card, backgroundColor: "#C62828", borderColor: "#B71C1C", borderWidth: 2 }} 
                onClick={() => router.push("/uyeligim")}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.70 }}
                transition={{ duration: 0.2 }}
              >
                <FaUser size={38} color="#FFF" style={styles.icon} />
                <span style={styles.cardText}>Dernek Üyeliğim</span>
              </motion.div>

              <motion.div style={{...styles.card, backgroundColor: "#388E3C", borderColor: "#2C6B2F", borderWidth: 2 }} 
                onClick={() => router.push("/funeral-found")}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.70 }}
                transition={{ duration: 0.2 }}
              >
                <FaHandHoldingUsd size={38} color="#FFF" style={styles.icon} />
                <span style={styles.cardText}>Cenaze Fonu Üyeliğim</span>
              </motion.div>

              <motion.div style={{...styles.card, backgroundColor: "#0277BD", borderColor: "#01579B", borderWidth: 2 }} 
                onClick={() => router.push("/payments")}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.70 }}
                transition={{ duration: 0.2 }}
              >
                <FaCreditCard size={38} color="#FFF" style={styles.icon} />
                <span style={styles.cardText}>Ödeme Işlemleri</span>
              </motion.div>
            </div>


            <Navbar />
          </>
        ) : (
          <Unauthorized></Unauthorized>
        )}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Nunito', sans-serif",
  } as React.CSSProperties,
  logoBackground: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px", 
    height: "500px",
    backgroundImage: "url('/assets/logo/actq.png')",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    opacity: 0.2,
    zIndex: -1, 
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
    color: "#FFF",
  } as React.CSSProperties,
  icon: {
    marginRight: "10px",
  },
  countdownContainer: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px 30px",
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.5rem",
    letterSpacing: "1px",
    transition: "transform 0.2s ease, box-shadow 0.3s ease",
    animation: "pulse 3s infinite",
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