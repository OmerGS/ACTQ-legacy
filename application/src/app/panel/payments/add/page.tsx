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

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Paiement</h2>

      {/* Sélectionner le membre */}
      <label>Membre</label>
      <select name="memberId" value={formData.memberId} onChange={handleChange} required>
        <option value="">Sélectionner un membre</option>
        {members
          .sort((a, b) => {
            const nameA = a.nom.toLowerCase();
            const nameB = b.nom.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          })
          .map((member) => (
            <option key={member.id} value={member.id}>
              {member.nom} {member.prenom} {"(Yas : " + (member.dateNaissance ? calculateAge(member.dateNaissance) : "Bilinmiyor") + ")"}
            </option>
          ))}
      </select>


      <label>Raison</label>
      <select name="reason" value={formData.reason} onChange={handleChange}>
        <option value="Aidat">Aidat</option>
        <option value="Bağış">Bağış</option>
        <option value="Cenaze Fonu">Cenaze Fonu</option>
        <option value="Diğer">Diğer</option>
      </select>

      <label>Méthode de paiement</label>
      <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
        <option value="Nakit">Nakit</option>
        <option value="Kart">Kart</option>
        <option value="Banka Havalesi">Banka Havalesi</option>
        <option value="Çek">Çek</option>
        <option value="Diğer">Diğer</option>
      </select>

      <label>Montant (€)</label>
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} required min="1" step="0.01" />

      <button type="submit">Valider</button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: "300px",
    margin: "20px auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
  } as React.CSSProperties,
};