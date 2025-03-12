"use client";

import { useEffect, useState } from "react";
import { useMembre } from "@/app/hooks/MemberContext";
import AdminServerConnection from "@/components/api/AdminServerConnection";
import { Membre } from "@/components/interface/Membre";
import Unauthorized from "@/components/reusable/Unauthorized";
import { FaArrowLeft } from "react-icons/fa";
import { formatDateWithSecondsStr } from "@/components/littleComponents/FormatDate";
import { useRouter } from 'next/navigation';

const fieldLabels: Record<string, string> = {
  nom: "Soyisim",
  prenom: "İsim",
  barcode: "Üyelik Numarası",
  createdAt: "Giriş Tarihi",
};

export default function MembresPage() {
  const [membres, setMembres] = useState<Membre[]>([]);
  const [filteredMembres, setFilteredMembres] = useState<Membre[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [editingMembre, setEditingMembre] = useState<Membre | null>(null);
  const { membre } = useMembre();
  const router = useRouter();

  useEffect(() => {
    async function fetchMembres() {
      try {
        const data = await AdminServerConnection.getRecentMember();
        setMembres(data);
        setFilteredMembres(data);
      } catch (error) {
        console.error("Erreur lors du chargement des membres :", error);
      }
    }

    fetchMembres();
  }, []);

  const toggleOpen = (id: number) => {
    if (editingMembre && editingMembre.id === id) {
      return; 
    }
    setOpenId(openId === id ? null : id);
  };

  if (!membre || membre?.specialRole !== "Administrator" && membre?.specialRole !== "Moderator") {
    return <Unauthorized />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.backButtonContainer}>
        <button style={styles.backButton} onClick={() => router.back()}>
          <FaArrowLeft size={18} style={styles.backIcon} /> Geri
        </button>
      </div>
      
      <h2 style={styles.title}>Son Eklenen Üyeler</h2>

      <p style={styles.totalFilteredText}>
        Bu sayfada, son 1 hafta içinde eklenen üyeler gösterilecektir
      </p>

      {filteredMembres.length === 0 ? (
        <p style={styles.totalFilteredText}>
          1 Hafta içinde hiçbir üye kaydolmamıştır.
        </p>
      ) : (
        <div style={styles.membreList}>
          {filteredMembres.map((membre) => (
            <div
              key={membre.id}
              style={styles.membreCard}
              onClick={() => toggleOpen(membre.id)}
            >
              <div style={styles.membreHeader}>
                <span style={styles.membreName}>
                  {membre.prenom} {membre.nom}
                </span>
                <span style={styles.arrow}>
                  {openId === membre.id ? "▲" : "▼"}
                </span>
              </div>
    
              {openId === membre.id && (
                <div style={styles.membreDetails}>
                  {Object.entries(membre).map(([key, value]) =>
                    value && key !== "id" ? (
                      <p key={key}>
                        <strong>{fieldLabels[key] || key} : </strong>
                        {key === "createdAt" ? formatDateWithSecondsStr(value as string) : (
                          key === "cenazeFonu" ? (value === 1 ? "Evet" : "Hayır") : value
                        )}
                      </p>
                    ) : null
                  )}
                </div>            
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );  
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    backgroundColor: "#F7F9FB",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
  },
  backButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    padding: "10px",
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
  totalFilteredText: {
    padding: "12px 20px",
    backgroundColor: "#FFFFFF",
    color: "#333333",
    borderRadius: "10px",
    border: "1px solid #E0E0E0",
    fontSize: "18px",
    fontWeight: "500",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    marginBottom: "20px",
    display: "inline-block",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  filterItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#FFF",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
    border: "2px solid #211bd5",
    transition: "box-shadow 0.3s ease",
    width: "100%", 
    maxWidth: "250px",
  },
  icon: {
    fontSize: "16px",
    color: "#211bd5",
  },
  filterSelect: {
    flex: 1,
    padding: "8px",
    fontSize: "13px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    outline: "none",
    minWidth: "140px",
  },
  inputField: {
    width: "100%",
    maxWidth: "100%",  
    padding: "12px 15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: "#FFF",
    color: "#333",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    marginBottom: "15px",
    boxSizing: "border-box",
  },
  inputFieldFocus: {
    borderColor: "#28a745",
    boxShadow: "0 0 8px rgba(40, 167, 69, 0.5)",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "25px",
    color: "#D9534F",
  },
  searchBar: {
    padding: "12px",
    width: "100%",
    maxWidth: "100%", 
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #D9534F",
    outline: "none",
    fontSize: "16px",
    backgroundColor: "#FFF",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  },
  searchBarFocus: {
    borderColor: "#28a745",
  },
  membreList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "700px",
    boxSizing: "border-box",
  },
  membreCard: {
    backgroundColor: "#FFF",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    border: "2px solid #D9534F",
    transition: "box-shadow 0.3s ease",
  },
  membreCardHover: {
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
  },
  membreHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "22px",
    fontWeight: "600",
    color: "#D9534F",
  },
  membreName: {
    color: "#D9534F",
    fontWeight: "bold",
  },
  arrow: {
    fontSize: "22px",
    color: "#D9534F",
  },
  membreDetails: {
    marginTop: "15px",
    paddingTop: "10px",
    borderTop: "1px solid #f0f0f0",
    fontSize: "16px",
    lineHeight: "1.5",
  },
  editButton: {
    backgroundColor: "#D9534F",
    color: "#FFF",
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginTop: "15px",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
    gap: "25px",
    marginBottom: "15px",
  },
  editButtonHover: {
    backgroundColor: "#B93C36",
  },
  editForm: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    transition: "box-shadow 0.3s ease",
    boxSizing: "border-box",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
    marginBottom: "15px",
  },
  saveButtonHover: {
    backgroundColor: "#218838",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  cancelButtonHover: {
    backgroundColor: "#c82333",
  },
  formGroup: {
    marginBottom: "25px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#555",
    marginBottom: "10px",
    display: "block",
  },
  selectField: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: "#fff",
    transition: "border-color 0.3s ease",
    marginBottom: "15px",
  },
  selectFieldFocus: {
    borderColor: "#28a745",
  },
};

const mediaQuery = `
  @media (max-width: 600px) {
    .filters {
      flex-direction: column;
      align-items: center;
    }
    .filterItem {
      width: 90%;
    }
    .filterSelect {
      font-size: 12px;
    }
  }
`;

const styleTag = document.createElement("style");
styleTag.innerHTML = mediaQuery;
document.head.appendChild(styleTag);