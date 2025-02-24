"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegSun, FaRegMoon } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTurkish, setIsTurkish] = useState(true);

  useEffect(() => {
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(userPrefersDark);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleLanguage = () => setIsTurkish(!isTurkish);

  const buttonLabels = isTurkish
    ? { firstTime: "Kaydol", login: "Giriş Yap" }
    : { firstTime: "Inscription", login: "Connexion" };

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
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        textAlign: "center",
        padding: "20px",
        position: "relative",
        transition: "background-color 0.5s ease",
      }}
    >
      <div style={{ position: "absolute", top: "20px", right: "20px", display: "flex", gap: "20px" }}>
        <button onClick={toggleDarkMode} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "24px", color: isDarkMode ? "#fff" : "#000", transition: "color 0.3s" }}>
          {isDarkMode ? <FaRegMoon /> : <FaRegSun />}
        </button>
        <button onClick={toggleLanguage} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "24px", color: isDarkMode ? "#fff" : "#000", transition: "color 0.3s" }}>
          {isTurkish ? "🇫🇷" : "🇹🇷"}
        </button>
      </div>

      <motion.img
        src="/assets/logo/actq.png"
        alt="Logo"
        style={{ width: "200px", marginBottom: "50px" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <motion.button
        onClick={() => router.push("/auth/signup")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ padding: "15px 30px", margin: "10px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "30px", cursor: "pointer", fontSize: "16px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", transition: "all 0.3s ease-in-out" }}
      >
        {buttonLabels.firstTime}
      </motion.button>

      <motion.button
        onClick={() => router.push("/auth/login")}
        whileHover={{ scale: 1.10 }}
        whileTap={{ scale: 0.95 }}
        style={{ padding: "15px 30px", margin: "10px", backgroundColor: "#008CBA", color: "#fff", border: "none", borderRadius: "30px", cursor: "pointer", fontSize: "16px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", transition: "all 0.3s ease-in-out" }}
      >
        {buttonLabels.login}
      </motion.button>
    </motion.div>
  );
}