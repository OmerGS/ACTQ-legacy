"use client";

import { useState } from "react";
import { useMembre } from "@/app/hooks/MemberContext";
import Unauthorized from "@/components/reusable/Unauthorized";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AdminServerConnection from "@/components/api/AdminServerConnection";
import { hasRole } from "@/components/enum/Role";

export default function MembresPage() {
  const { membre } = useMembre();
  const router = useRouter();
  
  const currentYear = new Date().getFullYear();

  const [aidatYear, setAidatYear] = useState<string>("");
  const [cenazeYear, setCenazeYear] = useState<string>("");
  const [cenazePrice, setCenazePrice] = useState<string>("");

  if (!membre || !hasRole(membre.specialRole, 'administration')) {
    return <Unauthorized />;
  }

  const handleAidatSubmit = async () => {
    if (parseInt(aidatYear.toString()) >= currentYear) {
      try {
        const response = await AdminServerConnection.generateAidat(parseInt(aidatYear));
        
        if (response.error) {
          alert(response.error);
        } else {
          alert("Yeni yıl Aidatı başarıyla eklendi");
        }
      } catch (error) {
      }

    } else {
      alert("Lütfen geçerli bir yıl girin.");
    }
  };

  const handleCenazeSubmit = async () => {
    if (parseInt(cenazeYear.toString()) >= currentYear) {
      try {
        const response = await AdminServerConnection.generateCenazeFonu(parseInt(cenazeYear), parseInt(cenazePrice));
        
        if (response.error) {
          alert(response.error);
        } else {
          alert("Yeni yıl Cenaze Fonu başarıyla eklendi");
        }
      } catch (error) {
      }
    } else {
      alert("Lütfen geçerli bir yıl girin.");
    }
  };

  return (
    <div style={styles.formContainer}>
      <button style={styles.backButton} onClick={() => router.back()}>
        <FaArrowLeft size={18} style={styles.backIcon} /> Geri
      </button>
      <h1 style={styles.formTitle}>Aidat ve Cenaze Fonu Ekle</h1>

      <div style={styles.priceListContainer}>
        <div style={{ ...styles.priceContainer, backgroundColor: "#D9534F" }}>
          <h2 style={styles.subTitle}>Aidat</h2>
          <label style={styles.label}>Yıl:</label>
          <input
            type="number"
            placeholder="Yılı girin"
            min={currentYear}
            value={aidatYear}
            onChange={(e) => setAidatYear(e.target.value)}
            style={styles.input}
          />
          <button style={styles.updateButton} onClick={handleAidatSubmit}>Valider</button>
        </div>

        <div style={{ ...styles.priceContainer, backgroundColor: "#32CD32" }}>
          <h2 style={styles.subTitle}>Cenaze Fonu</h2>
          <label style={styles.label}>Yıl:</label>
          <input
            type="number"
            placeholder="Yılı girin"
            min={currentYear} 
            value={cenazeYear}
            onChange={(e) => setCenazeYear(e.target.value)}
            style={styles.input}
          />
          <label style={styles.label}>Fiyat:</label>
          <input
            type="number"
            min={0}
            placeholder="Fiyat girin"
            value={cenazePrice}
            onChange={(e) => setCenazePrice(e.target.value) }
            style={{ ...styles.priceInput, color: "#000" }}
          />
          <button style={styles.updateButton} onClick={handleCenazeSubmit}>Valider</button>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  formContainer: {
    padding: "20px",
    maxWidth: "100%",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "'Nunito', sans-serif",
  },
  formTitle: {
    fontSize: "1.6rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
  },
  formDescription: {
    fontSize: "1rem",
    color: "#777",
    marginBottom: "20px",
  },
  priceListContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "20px",
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  subTitle: {
    fontSize: "1.4rem",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "12px",
  },
  input: {
    fontSize: "1rem",
    padding: "12px",
    width: "80%",
    borderRadius: "6px",
    border: "1px solid #ddd",
    transition: "all 0.3s ease",
  },
  priceInput: {
    fontSize: "1.2rem",
    color: "#fff",
    border: "1px solid #ddd",
    padding: "8px",
    width: "45%",
    borderRadius: "6px",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "500",
    color: "#fff",
  },
  updateButton: {
    fontSize: "1rem",
    padding: "8px 12px",
    backgroundColor: "#fff",
    color: "#D9534F",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    marginTop: "15px",
  },
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
  },
};
