"use client";

import { useEffect, useState } from "react";
import { useMembre } from "@/app/hooks/MemberContext";
import AdminServerConnection from "@/components/api/AdminServerConnection";
import { Payment } from "@/components/interface/Payment";
import Unauthorized from "@/components/reusable/Unauthorized";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaPen, FaTrash } from "react-icons/fa";

const formatDateWithSeconds = (dateString: Date) => {
  const date = new Date(dateString);
  
  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export default function MembresPage() {
  const currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentYear = currentDate.getFullYear().toString();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { membre } = useMembre();
  const router = useRouter();

  useEffect(() => {
    async function fetchPayments(month: string, year: string) {
      try {
        const data = await AdminServerConnection.getPaymentsByMonthAndYear(month, year);
        setPayments(data);
        setFilteredPayments(data);
      } catch (error) {
        console.error("Erreur lors du chargement des paiements :", error);
      }
    }

    if (selectedMonth && selectedYear) {
      fetchPayments(selectedMonth, selectedYear);
    }
  }, [selectedMonth, selectedYear]);

  if (!membre || membre?.specialRole !== "Administrator") {
    return <Unauthorized />;
  }

  // Fonction pour filtrer les paiements
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    async function fetchPayments(month: string, year: string) {
      try {
        const data = await AdminServerConnection.getPaymentsByMonthAndYear(month, year);
        setPayments(data);
        setFilteredPayments(data);
      } catch (error) {
        console.error("Erreur lors du chargement des paiements :", error);
      }
    }
    fetchPayments(selectedMonth, selectedYear);
  };

  // Fonction pour calculer les totaux par raison
  const calculateTotalByReason = (payments: Payment[]) => {
    return payments.reduce((totals, payment) => {
      const amount = parseFloat(payment.amount.toString());
      if (totals[payment.reason]) {
        totals[payment.reason] += amount;
      } else {
        totals[payment.reason] = amount;
      }
      return totals;
    }, {} as { [key: string]: number });
  };


  // Calculer les totaux pour le mois et l'année sélectionnés
  const totalByReason = calculateTotalByReason(filteredPayments);

  const handleDeletePayment = async (transactionId: string) => {
      const confirmDelete = window.confirm("Bu ödemeyi silmek istediğinizden emin misiniz?");
      
      if (confirmDelete) {
        const updatedPayments = filteredPayments.filter(
          (payment) => payment.transactionId !== transactionId
        );
        setFilteredPayments(updatedPayments);
    
        try {
          const response = await AdminServerConnection.deletePayment(transactionId);
          if (response.success) {
            alert(response.message);
          } else {
            setFilteredPayments((prevPayments) => [
              ...prevPayments,
              ...updatedPayments.filter((payment) => payment.transactionId === transactionId),
            ]);
            alert("Silme işlemi başarısız oldu. Lütfen tekrar deneyin.");
          }
        } catch (error) {
          console.error("Ödeme silinirken hata oluştu:", error);
    
          setFilteredPayments((prevPayments) => [
            ...prevPayments,
            ...updatedPayments.filter((payment) => payment.transactionId === transactionId),
          ]);
    
          alert("Sunucu hatası. Lütfen tekrar deneyin.");
        }
      }
    };  

  return (
    <div style={styles.formContainer}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button style={styles.backButton} onClick={() => router.back()}>
          <FaArrowLeft size={18} style={styles.backIcon} /> Geri
        </button>

        { isEditing === false ? (
          <button style={styles.editButton} onClick={() => setIsEditing(!isEditing)}>
            <FaPen size={18} style={{ marginRight: '8px' }} /> Düzenle
          </button>
        ) : 
        <button style={styles.editButton} onClick={() => setIsEditing(!isEditing)}>
            <FaPen size={18} style={{ marginRight: '8px' }} /> Vazgeç
          </button>
        }
        
      </div>
      <h1 style={styles.formTitle}>Ödemeler</h1>

      {/* Formulaire de sélection du mois et de l'année */}
      <form onSubmit={handleSearch} style={styles.form}>
        <div style={styles.selectContainer}>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={styles.select}
          >
            {Array.from({ length: 12 }, (_, i) => {
              const month = String(i + 1).padStart(2, "0");
              return (
                <option key={month} value={month}>
                  {month}
                </option>
              );
            })}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={styles.select}
          >
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      </form>

      {/* Affichage des totaux par raison */}
      <div style={styles.totalContainer}>
        <h2>Toplam ödemeler :</h2>
        {Object.entries(totalByReason).length === 0 ? (
          <p>Aucun paiement trouvé, total : 0 €</p>
        ) : (
          Object.entries(totalByReason).map(([reason, total]) => (
            <p key={reason}>
              <strong>{reason} :</strong> {total ? total : 0} €
            </p>
          ))
        )}
      </div>

      {/* Affichage des paiements */}
      <div style={styles.paymentListContainer}>
        {filteredPayments.length === 0 ? (
          <p>Aucun paiement trouvé pour cette période.</p>
        ) : (
          filteredPayments
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((payment) => {
              const reasonStyle = paymentReasonStyles[payment.reason];
              return (
                <div key={payment.id} style={{ ...styles.paymentItem, ...reasonStyle }}>
                  <p><strong>Neden :</strong> {payment.reason}</p>
                  <p><strong>Üye :</strong> {payment.memberPrenom} {payment.memberNom}</p>
                  <p><strong>Fatura N° :</strong> {payment.transactionId}</p>
                  <p><strong>Tutar :</strong> {payment.amount} €</p>
                  <p><strong>Tarih :</strong> {formatDateWithSeconds(payment.date)}</p>
                  <p><strong>Ödeme Şekli :</strong> {payment.paymentMethod}</p>
                  <p><strong>Onaylayan :</strong> {payment.receiverPrenom} {payment.receiverNom}</p>
                  
                  {isEditing === true ? (
                    <button
                    style={styles.deleteButton}
                    onClick={() => handleDeletePayment(payment.transactionId)}
                    >
                    <FaTrash size={18}/>
                  </button>
                  ) : null }
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  formContainer: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "'Nunito', sans-serif",
    fontSize: "1rem",
  },
  editButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#007BFF",
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
  formTitle: {
    fontSize: "2rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  selectContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
  select: {
    fontSize: "1rem",
    padding: "12px 18px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "160px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
    transition: "border-color 0.2s ease-in-out",
  },
  totalContainer: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
  },
  paymentListContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  paymentItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    fontSize: "1rem",
    transition: "box-shadow 0.2s ease-in-out, background-color 0.2s ease",
  },
  deleteButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 10px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
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

const paymentReasonStyles: { [key: string]: React.CSSProperties } = {
  "Aidat": {
    backgroundColor: "#f5c6cb",
    borderColor: "#f1a7b1",
    color: "#721c24",
  },
  "Cenaze Fonu": {
    backgroundColor: "#55ca7c",
    borderColor: "#00654d",
    color: "#fff",
  },
  "Bağış": {
    backgroundColor: "#d1ecf1",
    borderColor: "#a3d0e8",
    color: "#0c5460",
  },
  "Diğer": {
    backgroundColor: "#ffe8a1",
    borderColor: "#e6c49f",
    color: "#856404",
  },
};