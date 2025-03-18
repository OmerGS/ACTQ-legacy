"use client";

import React, { useState, useEffect } from "react";
import { useMembre } from "@/app/hooks/MemberContext";
import { calculateAge } from "@/components/littleComponents/CalculateAge";
import AdminServerConnection from "@/components/api/AdminServerConnection";
import Unauthorized from "@/components/reusable/Unauthorized";
import { Membre } from "@/components/interface/Membre";
import ServerConnection from "@/components/api/ServerConnection";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function PaymentForm() {
  const router = useRouter();
  const { membre } = useMembre();
  const [members, setMembers] = useState<Membre[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<Membre | null>(null);
  const [aidatInformations, setAidatInformations] = useState<any[]>([]);
  const [cenazeFonuInfo, setcenazeFonuInfo] = useState<any[]>([]);




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
        console.error("Üyeler yüklenirken hata oluştu", error);
      }
    };

    fetchMembers();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (formData.amount <= 0) {
        return alert("Miktar pozitif olmalıdır.");
    }

    if (!formData.memberId) {
        alert("Lütfen üye giriniz.");
        return;
    }

    if(!membre){
      router.push('/');
      return;
    }

    formData.receiverId = membre.id;
    const response = await AdminServerConnection.addPayments(formData);

    if (response.success) {
      alert(response.message);
    } else {
      alert(response.error);
    }

    setFormData({ ...formData, amount: 0 });
  };

  const fetchAidatInfo = async (barcode: string) => {
    try {
      const result = await ServerConnection.getAidatInformationForMember(
        barcode, 
        formData.year
      );
      setAidatInformations(result.data);
    } catch (error) {
      console.error("Error fetching Aidat info", error);
    }
  };

  const fetchCenazeFonuInfo = async (barcode: string) => {
    try {
      const result = await ServerConnection.getCenazeFonuInformationForMember(
        barcode, 
        formData.year
      );
      setcenazeFonuInfo(result.data);
    } catch (error) {
      console.error("Error fetching Aidat info", error);
    }
  };

  if (!membre || membre?.specialRole !== "Administrator" && membre?.specialRole !== "Moderator") {
    return <Unauthorized />;
  }

  const filteredMembers = members.filter((member) =>
    `${member.prenom} ${member.nom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResetMember = () => {
    setSelectedMember(null);
    setSearchTerm("");
    setFormData({ ...formData, memberId: 0 });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <button style={styles.backButton} onClick={() => router.back()}>
        <FaArrowLeft size={18} /> Geri
      </button>
      
      <h2 style={styles.title}>Ödeme</h2>
      {/* Afficher le champ de recherche uniquement si aucun membre n'est sélectionné */}
      {!selectedMember && (
        <div style={styles.searchContainer}>
          <label style={styles.label}>Üye Arama</label>
          <input
            type="text"
            placeholder="Üye ara (isim veya soyisim)"
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
                    fetchAidatInfo(member.barcode);
                    fetchCenazeFonuInfo(member.barcode)
                  }}
                  style={styles.suggestionItem}
                >
                  {member.nom} {member.prenom}{" "}
                  {"(Yaş: " + (member.dateNaissance ? calculateAge(member.dateNaissance) : "Bilinmiyor") + ")"}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Afficher l'information du membre sélectionné */}
      {selectedMember && (
        <>
          <label style={styles.label}>Seçilen Üye</label>
          <input
            type="text"
            value={`${selectedMember.prenom} ${selectedMember.nom} (Yaş: ${selectedMember.dateNaissance ? calculateAge(selectedMember.dateNaissance) : "Bilinmiyor"})`}
            disabled
            style={styles.selectedMemberInput}
          />

          <p style={styles.aidatInfo}>Aidat Borcu : {aidatInformations[0]?.amountDue - aidatInformations[0]?.amountPaid}€</p>
          <p style={styles.aidatInfo}>
            Cenaze Fonu Borcu : {cenazeFonuInfo && cenazeFonuInfo[0] ? cenazeFonuInfo[0]?.amountDue - cenazeFonuInfo[0]?.amountPaid + "€" : "0€"}
          </p>

          <button
            type="button"
            onClick={handleResetMember}
            style={styles.resetButton}
          >
            Seçilen Üyeyi Sıfırla
          </button>
        </>
      )}

      {/* Raison de paiement */}
      <label style={styles.label}>Sebep</label>
      <select name="reason" value={formData.reason} onChange={handleChange} style={styles.selectInput}>
        <option value="Aidat">Aidat</option>
        <option value="Bağış">Bağış</option>
        <option value="Cenaze Fonu">Cenaze Fonu</option>
        <option value="Diğer">Diğer</option>
      </select>

      {/* Méthode de paiement */}
      <label style={styles.label}>Ödeme Yöntemi</label>
      <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} style={styles.selectInput}>
        <option value="Nakit">Nakit</option>
        <option value="Kart">Kart</option>
        <option value="Banka Havalesi">Banka Havalesi</option>
        <option value="Çek">Çek</option>
        <option value="Diğer">Diğer</option>
      </select>

      {/* Montant */}
      <label style={styles.label}>Tutar (€)</label>
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
        Onayla
      </button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: "420px",
    margin: "30px auto",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    borderRadius: "15px",
    backgroundColor: "#fff",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Nunito', sans-serif",
  } as React.CSSProperties,
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
  } as React.CSSProperties,
  title: {
    fontSize: "32px",
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    marginBottom: "25px",
    background: "linear-gradient(45deg, #d32f2f, #f44336)",
    padding: "10px",
    borderRadius: "8px",
  } as React.CSSProperties,
  label: {
    fontSize: "15px",
    color: "#333",
    marginBottom: "5px",
    fontWeight: "600",
  },
  searchContainer: {
    position: "relative",
  } as React.CSSProperties,
  searchInput: {
    padding: "14px 20px",
    border: "2px solid #d32f2f",
    borderRadius: "12px",
    width: "100%",
    fontSize: "16px",
    marginBottom: "15px",
    transition: "border-color 0.3s ease",
    outline: "none",
    boxSizing: "border-box",
  } as React.CSSProperties,
  suggestionList: {
    listStyle: "none",
    padding: 0,
    marginTop: "10px",
    border: "2px solid #d32f2f",
    borderRadius: "12px",
    maxHeight: "200px",
    overflowY: "auto",
    backgroundColor: "#fff",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
    width: "100%",
    boxSizing: "border-box",
  } as React.CSSProperties,
  suggestionItem: {
    padding: "12px 15px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    borderBottom: "1px solid #eaeaea",
  },
  selectedMemberInput: {
    padding: "12px 15px",
    border: "2px solid #d0d0d0",
    borderRadius: "12px",
    backgroundColor: "#f0f0f0",
    color: "#333",
    fontStyle: "italic",
  },
  aidatInfo: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "-8px",
  },
  resetButton: {
    backgroundColor: "#ff5733",
    color: "#fff",
    padding: "12px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s ease",
  } as React.CSSProperties,
  selectInput: {
    padding: "14px 20px",
    border: "2px solid #d32f2f",
    borderRadius: "12px",
    fontSize: "16px",
    marginBottom: "15px",
    transition: "border-color 0.3s ease",
  },
  input: {
    padding: "14px 20px",
    border: "2px solid #d32f2f",
    borderRadius: "12px",
    fontSize: "16px",
    marginBottom: "20px",
    transition: "border-color 0.3s ease",
  },
  submitButton: {
    padding: "15px 25px",
    backgroundColor: "#d32f2f",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};