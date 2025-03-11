"use client";

import { useState, useEffect } from "react";
import { useMembre } from "@/app/hooks/MemberContext";
import { calculateAge } from "@/components/littleComponents/CalculateAge";
import AdminServerConnection from "@/components/api/AdminServerConnection";
import Unauthorized from "@/components/reusable/Unauthorized";
import { Membre } from "@/components/interface/Membre";

export default function PaymentForm() {
  const { membre } = useMembre();
  const [members, setMembers] = useState<Membre[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<Membre | null>(null);
  const [formData, setFormData] = useState({
    memberId: 0,
    reason: "Aidat",
    year: new Date().getFullYear(),
    paymentMethod: "Kart",
    amount: 0,
    receiverId: membre?.id,
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const allMembers = await AdminServerConnection.getAllMember();
        setMembers(allMembers);
      } catch (error) {
        console.error("Erreur lors du chargement des membres", error);
      }
    };

    fetchMembers();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.amount <= 0) return alert("Le montant doit être positif.");

    try {
      formData.receiverId = membre.id;
      await AdminServerConnection.addPayments(formData);
      alert("Paiement ajouté !");
      setFormData({ ...formData, amount: 0 });
    } catch {
      alert("Erreur !");
    }
  };

  if (!membre || membre?.specialRole !== "Administrator") {
    return <Unauthorized />;
  }

  const filteredMembers = members.filter((member) =>
    `${member.prenom} ${member.nom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Paiement</h2>

      {/* Afficher le champ de recherche uniquement si aucun membre n'est sélectionné */}
      {!selectedMember && (
        <div style={styles.searchContainer}>
          <label style={styles.label}>Rechercher un membre</label>
          <input
            type="text"
            placeholder="Rechercher un membre (nom ou prénom)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />

          {/* Affichage des résultats de la recherche */}
          {searchTerm && filteredMembers.length > 0 && (
            <ul style={styles.suggestionList}>
              {filteredMembers.map((member) => (
                <li
                  key={member.id}
                  onClick={() => {
                    setSelectedMember(member);
                    setFormData({ ...formData, memberId: member.id });
                    setSearchTerm(`${member.prenom} ${member.nom}`);
                  }}
                  style={styles.suggestionItem}
                >
                  {member.nom} {member.prenom}{" "}
                  {"(Age: " + (member.dateNaissance ? calculateAge(member.dateNaissance) : "Inconnu") + ")"}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Afficher l'information du membre sélectionné */}
      {selectedMember && (
        <>
          <label style={styles.label}>Membre sélectionné</label>
          <input
            type="text"
            value={`${selectedMember.prenom} ${selectedMember.nom}`}
            disabled
            style={styles.selectedMemberInput}
          />
        </>
      )}

      {/* Raison de paiement */}
      <label style={styles.label}>Raison</label>
      <select name="reason" value={formData.reason} onChange={handleChange} style={styles.selectInput}>
        <option value="Aidat">Aidat</option>
        <option value="Bağış">Bağış</option>
        <option value="Cenaze Fonu">Cenaze Fonu</option>
        <option value="Diğer">Diğer</option>
      </select>

      {/* Méthode de paiement */}
      <label style={styles.label}>Méthode de paiement</label>
      <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} style={styles.selectInput}>
        <option value="Nakit">Nakit</option>
        <option value="Kart">Kart</option>
        <option value="Banka Havalesi">Banka Havalesi</option>
        <option value="Çek">Çek</option>
        <option value="Diğer">Diğer</option>
      </select>

      {/* Montant */}
      <label style={styles.label}>Montant (€)</label>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        required
        min="1"
        step="0.01"
        style={styles.input}
      />

      <button type="submit" style={styles.submitButton}>
        Valider
      </button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: "350px",
    margin: "20px auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    color: "#333",
    textAlign: "center",
    marginBottom: "10px",
  },
  label: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "5px",
  },
  searchContainer: {
    position: "relative",
  },
  searchInput: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
    fontSize: "14px",
    marginBottom: "10px",
    transition: "border-color 0.3s",
  },
  suggestionList: {
    listStyle: "none",
    padding: 0,
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    maxHeight: "200px",
    overflowY: "auto",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  suggestionItem: {
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  selectedMemberInput: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
    fontStyle: "italic",
    marginBottom: "15px",
    color: "#888",
  },
  selectInput: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    marginBottom: "20px",
  },
  submitButton: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};