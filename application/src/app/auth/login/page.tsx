"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/components/controller/login";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (await login(identifier, password)) {
      router.push("/home");
    }
  };

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8, 
          ease: "easeOut",
        }}
      >
        <motion.h2
          style={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          Giriş Yap
        </motion.h2>

        <motion.input
          type="text"
          placeholder="E-posta, Telefon veya Üye Numarası"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          style={styles.input}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut", 
          }}
        />

        <motion.input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut", 
          }}
        />

        <p style={styles.register}>
          Şifrenizi mi unuttunuz?{" "}
          <span
            style={styles.registerLink}
            onClick={() => alert("Bu Özellik Geliştirme Aşamasında, Yakında Kullanıma Sunulacak!")} 
          >
            Şifrenizi sıfırlayın
          </span>
        </p>

        <motion.button
          onClick={handleSubmit}
          style={styles.button}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut", 
          }}
        >
          Devam Et
        </motion.button>

        <p style={styles.register}>
          Hesabınız yok mu?{" "}
          <span
            style={styles.registerLink}
            onClick={() => router.push("/auth/signup")} 
          >
            Kayıt Ol
          </span>
        </p>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(135deg, #f8f8f8, #ffffff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'SF Pro Display', sans-serif",
  },
  card: {
    width: "90%",
    maxWidth: "380px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    margin: "20px", 
    willChange: "transform, opacity",
  } as React.CSSProperties,
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "25px",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    background: "rgba(255, 255, 255, 0.7)",
    fontSize: "16px",
    color: "#333",
    outline: "none",
    transition: "all 0.3s",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    willChange: "transform, opacity",
  },
  forgotPassword: {
    fontSize: "14px",
    color: "rgba(0, 0, 0, 0.6)",
    cursor: "pointer",
    marginBottom: "20px",
    transition: "color 0.3s",
  },
  button: {
    width: "100%",
    padding: "14px",
    fontSize: "18px",
    fontWeight: "600",
    background: "linear-gradient(135deg, #ececec, #dcdcdc)",
    color: "#333",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.08)",
    willChange: "transform, opacity",
  },
  register: {
    marginTop: "20px",
    fontSize: "14px",
    color: "rgba(0, 0, 0, 0.6)",
  },
  registerLink: {
    color: "#333",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "color 0.3s",
  },
};