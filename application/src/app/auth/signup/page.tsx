"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { handleSendCode, handleCheckCode } from "@/components/controller/signup";

export default function Signup() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";

    document.body.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      document.documentElement.style.height = "auto";
      document.body.style.height = "auto";
      document.body.removeEventListener('touchmove', (e) => {
        e.preventDefault();
      });
    };
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const success = await handleSendCode(phone);
    setIsSubmitting(false);

    if (success) {
      setShowCodeInput(true);
    }
  };

  const handlePhoneChange = (value) => {
    if (value) {
      const formattedPhone = value.replace(/[^0-9+]/g, '');
      setPhone(formattedPhone);
    } else {
      setPhone('');
    }
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
        height: "100vh",
        backgroundColor: "#F5F5F5",
        padding: "30px 20px 20px", 
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <motion.img
        src="/assets/logo/actq.png"
        alt="Logo"
        style={{
          width: "150px",
          marginBottom: "20px",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

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

      {!showCodeInput ? (
        <>
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
              marginBottom: "30px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <PhoneInput
              international
              defaultCountry="FR"
              value={phone}
              onChange={handlePhoneChange}  
              placeholder="Telefon Numarasi"
              countries={['FR', 'TR']}
            />
          </motion.div>

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
          >
            {isSubmitting ? "..." : "Uyeligimi Sorgula"}
          </motion.button>
        </>
      ) : (
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
              marginBottom: "30px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
          <motion.input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Doğrulama Kodu"
            style={{
              padding: "15px",
              width: "100%",
              maxWidth: "320px",
              borderRadius: "8px",
              border: "1px solid #E0E0E0",
              backgroundColor: "#FFF",
              marginTop: "20px",
              fontSize: "16px",
              textAlign: "center",
            }}
          />

            <motion.button
              onClick={() => handleCheckCode(phone, verificationCode, router)}  
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "15px 40px",
                width: "100%",
                maxWidth: "320px",
                borderRadius: "50px", 
                border: "none", 
                backgroundColor: "#276678", 
                color: "#FFF", 
                fontSize: "18px", 
                fontWeight: "bold", 
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease-in-out",
                cursor: "pointer",
                textAlign: "center",
                letterSpacing: "1px", 
                marginTop: "20px",
                outline: "none",
              }}
              disabled={isSubmitting}
            >
            {isSubmitting ? "..." : "Kodu Dogrula"}
          </motion.button>

        </motion.div>
        
      )}
    </motion.div>
  );
}