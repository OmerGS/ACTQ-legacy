"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/reusable/Navbar";
import Spinner from "@/components/reusable/Spinner";
import { useMembre } from "../hooks/MemberContext";
import axios from "axios";
import BACKEND_API from "@/properties/BACKEND_API";
import { FaEdit } from "react-icons/fa";

export default function Settings() {
  const router = useRouter();
  const { membre, setMembre } = useMembre();

  if (!membre) {
    return <Spinner />;
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_API.baseURL}/auth/logout`, {}, { withCredentials: true });
      setMembre(null);
      router.push("/");
    } catch (error) {
      console.error('Erreur lors de la suppression du token', error);
    }
  };

  const handleInfoChange = (field: string, newValue: string) => {
    console.log("Field : " + field, "newValue : " + newValue);

    alert("Bu Özellik Geliştirme Aşamasında, Yakında Kullanıma Sunulacak!");

    if(field == "adresseFr"){
      //router.push(`/edit/adress?country=Fransa`);
      return;
    } else if (field == "adresseTr"){
      //router.push(`/edit/adress?country=Türkiye`);
      return;
    }
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Ayarlar</h1>

      <div style={styles.infoCard}>
        <h2 style={styles.cardTitle}>Kişisel Bilgiler</h2>
        
        <InfoRow label="İsim" value={`${membre.prenom} ${membre.nom}`} />
        
        <EditableInfoRow
          label="E-posta"
          value={membre.email}
          field="email"
          onChange={handleInfoChange}
        />
        
        <EditableInfoRow
          label="Telefon"
          value={membre.telephone}
          field="telephone"
          onChange={handleInfoChange}
        />
        
        <EditableInfoRow
          label="Sifre"
          value="*********"
          field="sifre"
          onChange={handleInfoChange}
        />
        
        <EditableInfoRow
          label="Fransiz Adres"
          value={membre.adresseFr}
          field="adresseFr"
          onChange={handleInfoChange}
        />
        
        <EditableInfoRow
          label="Turk Adres"
          value={membre.adresseTr}
          field="adresseTr"
          onChange={handleInfoChange}
        />
        
        <InfoRow label="Üyelik Numarası" value={membre.barcode} />
      </div>

      <button onClick={handleLogout} style={styles.logoutButton}>
        Çıkış Yap
      </button>

      <Navbar />
    </div>
  );
}

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <div style={styles.infoRow}>
    <span style={styles.infoLabel}>{label}:</span>
    <span style={styles.infoValue}>{value}</span>
  </div>
);

const EditableInfoRow = ({
  label,
  value,
  field,
  onChange,
}: {
  label: string;
  value: string;
  field: string;
  onChange: (field: string, newValue: string) => void;
}) => {
  const handleEditClick = () => {
    onChange(field, value); 
  };

  return (
    <div style={styles.infoRow}>
      <span style={styles.infoLabel}>{label}:</span>
      <div style={styles.editContainer}>
        <span style={styles.infoValue}>{value}</span>
        <FaEdit
          style={styles.editIcon}
          onClick={handleEditClick}
        />
      </div>
    </div>
  );
};


const styles = {
  pageContainer: {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "18px",
    paddingBottom: "100px",
    fontFamily: "'Nunito', sans-serif",
    boxSizing: "border-box",
    textAlign: "center",
  } as React.CSSProperties,
  
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  } as React.CSSProperties,

  infoCard: {
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    width: "100%",
    maxWidth: "400px",
    marginBottom: "30px",
  } as React.CSSProperties,

  cardTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#222",
  } as React.CSSProperties,

  infoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
    fontSize: "16px",
    color: "#555",
    padding: "8px 0",
  } as React.CSSProperties,

  infoLabel: {
    fontWeight: "bold",
    color: "#222",
    flex: 1,
    paddingRight: "8px",
  } as React.CSSProperties,

  infoValue: {
    flex: 2,
    textAlign: "right",
    color: "#333",
  } as React.CSSProperties,

  editIcon: {
    cursor: "pointer",
    color: "#ff4d4d",
    marginLeft: "8px",
    transition: "color 0.3s ease",
    fontSize: "18px",
    ":hover": {
      color: "#e60000",
    },
  } as React.CSSProperties,

  editContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  inputField: {
    flex: 2,
    padding: "8px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginRight: "8px",
  },

  saveButton: {
    padding: "8px 12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },

  logoutButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "12px 24px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  } as React.CSSProperties,
};