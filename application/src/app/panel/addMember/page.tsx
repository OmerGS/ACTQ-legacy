"use client";

import { useState } from "react";
import { useMembre } from "@/app/hooks/MemberContext";
import Unauthorized from "@/components/reusable/Unauthorized";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import AdminServerConnection from "@/components/api/AdminServerConnection";

export default function MembresPage() {
  const { membre } = useMembre();
  const router = useRouter();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    barcode: generateBarcode(),
    aidatCategory: "Genç",
    cenazeFonu: 0,
  });

  function generateBarcode() {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handlePhoneChange(value: string | undefined) {
    setFormData({ ...formData, telephone: value || "" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.nom || !formData.prenom || !formData.telephone || !formData.barcode || !formData.aidatCategory) {
      alert("Lütfen tüm alanları doldurun !");
      return;
    }

    const phoneRegexFR = /^(\+33|0)[1-9](\d{2}){4}$/;
    const phoneRegexTR = /^\+90\d{10}$/;

    if (!phoneRegexFR.test(formData.telephone) && !phoneRegexTR.test(formData.telephone)) {
      alert("Geçersiz telefon numarası! Lütfen geçerli bir numara girin.");
      return;
    }

    await AdminServerConnection.addMember(formData);
  }

  if (!membre || membre?.specialRole !== "Administrator") {
    return <Unauthorized />;
  }

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => router.back()}>
        <FaArrowLeft size={18} style={styles.backIcon} /> Geri
      </button>

      <h2 style={styles.title}>Üye Ekleme Formu</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Soyisim :</label>
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.inputGroup}>
          <label>İsim :</label>
          <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.inputGroup}>
          <label>Telefon numarası :</label>
          <PhoneInput
            international
            defaultCountry="FR"
            value={formData.telephone}
            onChange={handlePhoneChange}
            placeholder="Ex: +33 6 12 34 56 78"
            countries={["FR", "TR"]}
            style={styles.phoneInput}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Üye numarası :</label>
          <input
            type="text"
            name="barcode"
            value={formData.barcode}
            readOnly
            style={styles.barcodeInput}
          />
        </div>


        <div style={styles.inputGroup}>
          <label>Aidat Kategorisi :</label>
          <select name="aidatCategory" value={formData.aidatCategory} onChange={handleChange} style={styles.input}>
            <option value="Genç">Genç</option>
            <option value="Normal">Normal</option>
            <option value="Emekli">Emekli</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label>Cenaze Fonu Üyesi :</label>
          <select name="cenazeFonu" value={formData.cenazeFonu} onChange={handleChange} style={styles.input}>
            <option value="1">Evet</option>
            <option value="0">Hayır</option>
          </select>
        </div>

        <button type="submit" style={styles.submitButton}>Üyeyi ekle</button>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "380px",
    margin: "0 auto",
    padding: "24px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    fontFamily: "'Nunito', sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#D9534F",
    fontSize: "1.8rem",
    fontWeight: "700",
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
    width: "auto",
    maxWidth: "100px", 
    textAlign: "center", 
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  barcodeInput: {
    border: "2px solid #D9534F",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "1rem",
    backgroundColor: "#f5f5f5", 
    color: "#666",
    cursor: "not-allowed",
    fontFamily: "'Nunito', sans-serif",
  },
  input: {
    border: "2px solid #D9534F",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    fontFamily: "'Nunito', sans-serif",
  },
  phoneInput: {
    width: "100%",
    border: "2px solid #D9534F",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "1rem",
    backgroundColor: "#fff",
    fontFamily: "'Nunito', sans-serif",
    boxSizing: "border-box",
  },  
  submitButton: {
    backgroundColor: "#D9534F",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontWeight: "600",
  },
};