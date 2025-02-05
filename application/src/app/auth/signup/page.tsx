"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { handleSignup } from "@/components/controller/signup";

export default function Signup() {
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    handleSignup(phone);
    setPhone('');
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
        padding: "0 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Logo de l'application */}
      <motion.img
        src="/assets/logo/actq.png"
        alt="Logo"
        style={{
          width: "150px",
          marginBottom: "30px",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Titre de la page */}
      <motion.h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#333",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Hesap Kurma
      </motion.h2>

      {/* Sélecteur de numéro avec code pays */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          padding: "15px",
          width: "100%",
          maxWidth: "320px",
          borderRadius: "8px",
          border: "1px solid #E0E0E0",
          backgroundColor: "#FFF",
          marginBottom: "20px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <PhoneInput
          international
          defaultCountry="FR"
          value={phone}
          onChange={setPhone}
          placeholder="Telefon Numarasi"
          countries={['FR', 'TR']}
        />
      </motion.div>

      {/* Bouton d'inscription */}
      <motion.button
        onClick={handleSubmit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: "15px 40px",
          backgroundColor: "#276678",
          color: "#FFF",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
          fontSize: "16px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
          marginTop: "30px",
        }}
        disabled={isSubmitting}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {isSubmitting ? "..." : "Uyeligimi Sorgula"}
      </motion.button>
    </motion.div>
  );
}