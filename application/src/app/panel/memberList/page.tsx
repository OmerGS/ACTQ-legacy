"use client";

import { useEffect, useState } from "react";
import { useMembre } from "@/app/hooks/MemberContext";
import AdminServerConnection from "@/components/api/AdminServerConnection";
import { Membre } from "@/components/interface/Membre";
import Unauthorized from "@/components/reusable/Unauthorized";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); 
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default function MembresPage() {
  const [membres, setMembres] = useState<Membre[]>([]);
  const [filteredMembres, setFilteredMembres] = useState<Membre[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { membre } = useMembre();

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
    setOpenId(openId === id ? null : id);
  };

  const fieldLabels: { [key: string]: string } = {
    nom: "Isim",
    prenom: "Soyisim",
    telephone: "Telefon",
    barcode: "Üye Numarasi",
    dateNaissance: "Dogum Tarihi",
    email: "Email",
    statut: "Üyelik Durumu",
    aidatCategory: "Aidat Kategorisi",
    adresseFr: "Adres (FR)",
    adresseTr: "Adres (TR)",
    specialRole: "Özel Rol",
  };

  if (!membre || membre?.specialRole !== "Administrator") {
    return (
      <Unauthorized></Unauthorized>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Liste des Membres</h2>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un membre..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchBar}
      />

      <div style={styles.membreList}>
        {filteredMembres.map((membre) => (
          <div key={membre.id} style={styles.membreCard} onClick={() => toggleOpen(membre.id)}>
            <div style={styles.membreHeader}>
              <span style={styles.membreName}>{membre.prenom} {membre.nom}</span>
              <span style={styles.arrow}>{openId === membre.id ? "▲" : "▼"}</span>
            </div>
            {openId === membre.id && (
              <div style={styles.membreDetails}>
                {Object.entries(membre).map(([key, value]) => (
                  (value && key !== "password" && key !== "salt") ? (
                    <p key={key}>
                      <strong>{fieldLabels[key] || formatKey(key)} :</strong> 
                      {key === "dateNaissance" ? ` ${formatDate(value as string)}` : ` ${value}`}
                    </p>
                  ) : null
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const formatKey = (key: string) => {
  return key.charAt(0).toUpperCase() + key.slice(1);
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    backgroundColor: "#FFF7F7",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    color: "#333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#D9534F",
  },
  searchBar: {
    padding: "10px",
    width: "100%",
    maxWidth: "450px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #D9534F",
    outline: "none",
    transition: "border-color 0.3s",
  },
  searchBarFocus: {
    borderColor: "#C9302C",
  },
  membreList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    maxWidth: "650px",
  },
  membreCard: {
    backgroundColor: "#FFF",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s",
    border: "2px solid #D9534F",
  },
  membreCardHover: {
    transform: "scale(1.03)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
  },
  membreHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "500",
    color: "#D9534F",
  },
  membreName: {
    flex: 1,
  },
  arrow: {
    fontSize: "20px",
    color: "#D9534F",
  },
  membreDetails: {
    marginTop: "10px",
    padding: "15px",
    backgroundColor: "#F9F9F9",
    borderRadius: "10px",
    fontSize: "15px",
    color: "#333",
    borderLeft: "4px solid #D9534F",
  },
};
