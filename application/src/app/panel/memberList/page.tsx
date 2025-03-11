"use client";

import { useEffect, useState } from "react";
import { useMembre } from "@/app/hooks/MemberContext";
import AdminServerConnection from "@/components/api/AdminServerConnection";
import { Membre } from "@/components/interface/Membre";
import Unauthorized from "@/components/reusable/Unauthorized";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); 
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const fieldLabels: Record<string, string> = {
  id: "ID",
  nom: "Soyisim",
  prenom: "İsim",
  aidatCategory: "Aidat Kategorisi",
  statut: "Üyelik Durumu",
  telephone: "Telefon",
  email: "E-Posta",
  barcode: "Üyelik Numarası",
  dateNaissance: "Doğum Tarihi",
  adresseFr: "Fransız Adresi",
  adresseTr: "Türk Adresi",
};

export default function MembresPage() {
  const [membres, setMembres] = useState<Membre[]>([]);
  const [filteredMembres, setFilteredMembres] = useState<Membre[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [editingMembre, setEditingMembre] = useState<Membre | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { membre } = useMembre();
  const router = useRouter();

  useEffect(() => {
    async function fetchMembres() {
      try {
        const data = await AdminServerConnection.getAllMember();
        setMembres(data);
        setFilteredMembres(data);
      } catch (error) {
        console.error("Erreur lors du chargement des membres :", error);
      }
    }

    fetchMembres();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredMembres(
      membres.filter(
        ({ nom, prenom, email, telephone, barcode }) =>
          nom?.toLowerCase().includes(query) ||
          prenom?.toLowerCase().includes(query) ||
          email?.toLowerCase().includes(query) ||
          telephone?.toLowerCase().includes(query) ||
          barcode?.toLowerCase().includes(query)
      )
    );
  }, [searchQuery, membres]);

  const toggleOpen = (id: number) => {
    if (editingMembre && editingMembre.id === id) {
      return; 
    }
    setOpenId(openId === id ? null : id);
  };
  

  const handleEdit = (membre: Membre) => {
    setEditingMembre(membre);
  };

  const handleCancelEdit = () => {
    setEditingMembre(null);
  };

  const handleSaveEdit = async () => {
    if (editingMembre) {
      try {
        await AdminServerConnection.updateMember(editingMembre);
        setMembres((prev) =>
          prev.map((m) => (m.id === editingMembre.id ? editingMembre : m))
        );
        setFilteredMembres((prev) =>
          prev.map((m) => (m.id === editingMembre.id ? editingMembre : m))
        );
        setEditingMembre(null);
      } catch (error) {
        console.error("Erreur lors de la mise à jour du membre :", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editingMembre) {
      setEditingMembre({ ...editingMembre, [e.target.name]: e.target.value });
    }
  };  

  if (!membre || membre?.specialRole !== "Administrator") {
    return <Unauthorized />;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Liste des Membres</h2>
  
      <input
        type="text"
        placeholder="Rechercher un membre..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchBar}
      />
  
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
                  value && key !== "password" && key !== "salt" && key !== "specialRole" ?  (
                    <p key={key}>
                      <strong>{fieldLabels[key] || key} : </strong>
                      {key === "dateNaissance" ? formatDate(value as string) : value}
                    </p>
                  ) : null
                )}
                <button
                  style={styles.editButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleEdit(membre);
                  }}
                >
                  Düzenle
                </button>
              </div>
            )}
  
            {/* Affiche le formulaire d'édition sous le membre sélectionné */}
            {editingMembre?.id === membre.id && (
              <div style={styles.editForm}>
                <h3>Modifier {editingMembre.prenom} {editingMembre.nom}</h3>
                {Object.entries(editingMembre).map(([key, value]) => {
                if (key === "password" || key === "specialRole" || key === "dateNaissance" || key === "barcode" || key === "id"  || key === "salt" || value === null) return null;

                const label = fieldLabels[key] || key; 

                if (key === "aidatCategory") {
                  return (
                    <div key={key}>
                      <label>{label} : </label>
                      <select
                        style={{
                          ...styles.inputField,
                        }}
                        name={key}
                        value={value || "Normal"}
                        onChange={handleChange}
                      >
                        <option value="Genç">Genç</option>
                        <option value="Normal">Normal</option>
                        <option value="Emekli">Emekli</option>
                      </select>
                    </div>
                  );
                }

                if (key === "statut") {
                  return (
                    <div key={key}>
                      <label>{label} : </label>
                      <select
                        style={{
                          ...styles.inputField,
                        }}
                        name={key}
                        value={value || "Aktif"}
                        onChange={handleChange}
                      >
                        <option value="Aktif">Aktif</option>
                        <option value="Donduruldu">Donduruldu</option>
                        <option value="Düştü">Düştü</option>
                      </select>
                    </div>
                  );
                }

                return (
                  <div key={key}>
                    <label>{label} : </label>
                    <input
                      style={{
                        ...styles.inputField,
                      }}
                      type="text"
                      name={key}
                      value={String(value)}
                      onChange={handleChange}
                    />
                  </div>
                );
              })}
                <button style={styles.saveButton} onClick={handleSaveEdit}>
                  Kaydet
                </button>
                <button style={styles.cancelButton} onClick={handleCancelEdit}>
                  İptal
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
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
  } as React.CSSProperties,
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
