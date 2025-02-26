"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/components/controller/login";

export default function Login() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if(await login(identifier, password)){
      router.push("/home");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Giriş Yapın</h2>

        {/* Single identifier input for both email and phone */}
        <input
          type="text"
          placeholder="E-posta, Telefon veya Üye Numarası"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          style={styles.input}
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {/* Forgot password link */}
        <p style={styles.forgotPassword}>Şifremi unuttum?</p>

        {/* Submit button */}
        <button onClick={handleSubmit} style={styles.button}>
          Onayla
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(-45deg, #c8d7de, #b5e2d7, #f5c6cb, #e8d6f3)",
    backgroundSize: "400% 400%",
    animation: "nobleGradient 12s ease infinite",
  },
  card: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "80%",
    maxWidth: "350px",
    animation: "fadeIn 0.5s ease-in-out",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#00BFAE",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    width: "100%",
  },
  forgotPassword: {
    fontSize: "14px",
    color: "#00BFAE",
    cursor: "pointer",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#00BFAE",
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s, box-shadow 0.3s",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
};