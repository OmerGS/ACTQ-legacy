"use client";

import { useEffect, useState } from "react";
import { useMembre } from "@/app/hooks/MemberContext";
import AdminServerConnection from "@/components/api/AdminServerConnection";
import { Payment } from "@/components/interface/Payment";
import Unauthorized from "@/components/reusable/Unauthorized";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

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
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const { membre } = useMembre();
  const router = useRouter();

  useEffect(() => {
    async function fetchPayments() {
      if (!membre || !membre.id) return;
      console.log("Fetching payments for membre:", membre);
      try {
        const data = await AdminServerConnection.getRecentTransaction(membre.id);
        console.log("Payments received:", data);
        setPayments(data);
        setFilteredPayments(data);
      } catch (error) {
        console.error("Erreur lors du chargement des paiements :", error);
      }
    }
    fetchPayments();
  }, [membre]);
    

  if (!membre || membre?.specialRole !== "Administrator" && membre?.specialRole !== "Moderator") {
    return <Unauthorized />;
  }

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
          alert(response.message);  // Başarı mesajı
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
      <button style={styles.backButton} onClick={() => router.back()}>
        <FaArrowLeft size={18} style={styles.backIcon} /> Geri
      </button>
      <h1 style={styles.formTitle}>Ödemeler</h1>

      {/* Affichage des totaux par raison */}
      <div style={styles.totalContainer}>
        <h2>Toplam ödemeler :</h2>
        <p style={{ color: '#000000', fontSize: '14px', marginTop: '8px' }}>
          Bu sayfa, sizin son 15 dakika içinde kaydettiğiniz ödemeleri içerir.
        </p>
        {Object.entries(totalByReason).length === 0 ? (
          <p>Hiçbir ödeme bulunamadı, toplam : 0 €</p>
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
          <p>Hiçbir ödeme bulunamadı</p>
        ) : (
          filteredPayments
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((payment) => {
              const reasonStyle = paymentReasonStyles[payment.reason];
              return (
                <div key={payment.id} style={{ ...styles.paymentItem, ...reasonStyle }}>
                  <p><strong>{payment.reason}</strong></p>
                  <p><strong>Üye :</strong> {payment.memberPrenom} {payment.memberNom}</p>
                  <p><strong>Fatura N° :</strong> {payment.transactionId}</p>
                  <p><strong>Tutar :</strong> {payment.amount} €</p>
                  <p><strong>Tarih :</strong> {formatDateWithSeconds(payment.date)}</p>
                  <p><strong>Ödeme Şekli :</strong> {payment.paymentMethod}</p>
                  <p><strong>Onaylayan :</strong> {payment.receiverPrenom} {payment.receiverNom}</p>
                  {/* Bouton de suppression */}
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDeletePayment(payment.transactionId)}
                  >
                    <FaTrash size={18}/>
                  </button>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
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