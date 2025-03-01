"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaRegSun, FaRegMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import { Membre } from "@/components/interface/Membre";
import ServerConnection from "@/components/api/ServerConnection";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [membre, setMembre] = useState<Membre | null>(null);

  useEffect(() => {
    const fetchMembre = async (email: string) => {
      try {
        const membreServeur = await ServerConnection.getMemberByIdentifier(email);
        if (membreServeur) {
          localStorage.setItem("user", JSON.stringify(membreServeur));
          setMembre(membreServeur);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du membre :", error);
      }
    };

    const fetchedMembre = localStorage.getItem("user");

    if (fetchedMembre) {
      let membreObj;

      try {
        membreObj = JSON.parse(fetchedMembre);
      } catch (error) {
        console.error("Erreur lors du parsing du membre :", error);
        return;
      }

      if (membreObj?.member?.email) {
        fetchMembre(membreObj.member.email);
      }

      if (membreObj.member?.dateNaissance) {
        const dateNaissance = new Date(membreObj.member.dateNaissance);
        dateNaissance.setDate(dateNaissance.getDate() + 1);
        membreObj.member.dateNaissance = dateNaissance.toISOString().split("T")[0];
      }

      setMembre(membreObj.member);
    }

    if (membre?.email && pathname !== "/home") {
      setIsUserConnected(true);
      router.replace("/home");
    } else {
      setIsUserConnected(false);
    }

    // Mode sombre
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);

    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    setShowInstallPrompt(isIOS && !isStandalone);
  }, [pathname]); 

  const buttonLabels = { 
    firstTime: "Kayıt Ol", 
    login: "Giriş Yap", 
    install: "Ana Ekrana Ekle" 
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: isDarkMode ? "#222" : "#f5f5f5",
        color: isDarkMode ? "#fff" : "#333",
        textAlign: "center",
        padding: "20px",
        position: "relative",
        transition: "background-color 0.5s ease",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      <div style={{ position: "absolute", top: "20px", right: "20px", display: "flex", gap: "20px" }}>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={styles.iconButton(isDarkMode)}>
          {isDarkMode ? <FaRegMoon /> : <FaRegSun />}
        </button>
      </div>

      <motion.img
        src="/assets/logo/actq.png"
        alt="Logo"
        style={styles.logoImage}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <motion.button
        onClick={() => router.push("/auth/signup")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={styles.primaryButton}
      >
        {buttonLabels.firstTime}
      </motion.button>

      <motion.button
        onClick={() => router.push("/auth/login")}
        whileHover={{ scale: 1.10 }}
        whileTap={{ scale: 0.95 }}
        style={styles.secondaryButton}
      >
        {buttonLabels.login}
      </motion.button>

      {showInstallPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.installPrompt}
        >
          📲 <strong>{buttonLabels.install}</strong>
          <br />
          <strong>1.</strong> Safari'de aşağıdaki <span style={{ fontSize: "18px" }}>🔼</span> simgesine dokunun.
          <br />
          <strong>2.</strong> Açılan menüden <strong>"Ana Ekrana Ekle"</strong> seçeneğini seçin.
          <br />
          <button
            onClick={() => setShowInstallPrompt(false)}
            style={styles.closeButton}
          >
            Kapat
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

const styles = {
  iconButton: (isDarkMode: boolean) => ({
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "24px",
    color: isDarkMode ? "#fff" : "#000",
    transition: "color 0.3s",
  }),
  logoImage: {
    width: "200px",
    marginBottom: "50px",
  },
  primaryButton: {
    padding: "15px 30px",
    margin: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
  },
  secondaryButton: {
    padding: "15px 30px",
    margin: "10px",
    backgroundColor: "#008CBA",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
  },
  installPrompt: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0, 0, 0, 0.9)",
    color: "#fff",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    maxWidth: "300px",
    fontSize: "14px",
    lineHeight: "1.5",
  } as React.CSSProperties,
  closeButton: {
    marginTop: "15px",
    padding: "8px 15px",
    backgroundColor: "transparent",
    color: "#fff",
    border: "1px solid #fff",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
};