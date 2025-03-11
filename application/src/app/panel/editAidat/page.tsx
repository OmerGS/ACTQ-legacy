"use client";

import { useState, useEffect } from "react";
import { useMembre } from "@/app/hooks/MemberContext";
import Unauthorized from "@/components/reusable/Unauthorized";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import AdminServerConnection from "@/components/api/AdminServerConnection";

export default function MembresPage() {
  const { membre } = useMembre();
  const router = useRouter();

  const [aidatPrices, setAidatPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [newCategory, setNewCategory] = useState<string>("");
  const [newPrice, setNewPrice] = useState<string>("");

  const [editingPrice, setEditingPrice] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchAidatPrice = async () => {
      try {
        const response = await AdminServerConnection.getAidat();
        if (response && response.length > 0) {
          setAidatPrices(response);
        } else {
          alert("Aidat fiyatları alınamadı.");
        }
      } catch (error) {
        alert("Fiyatlar alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchAidatPrice();
  }, []);

  /*
  const handleAddCategory = async () => {
    if (!newCategory || !newPrice) {
      alert("Her iki alanın da doldurulması gerekiyor.");
      return;
    }

    try {
      await AdminServerConnection.addNewAidatCategory(newCategory, newPrice);
      setAidatPrices([...aidatPrices, { category: newCategory, price: newPrice }]);
      setNewCategory("");
      setNewPrice("");
    } catch (error) {
      alert("Kategori eklenirken bir hata oluştu.");
    }
  };
  */

  const handleUpdatePrice = async (category: string) => {
    const newPrice = editingPrice[category];
    if (!newPrice) {
      alert("Fiyat boş olamaz.");
      return;
    }

    try {
      await AdminServerConnection.editAidatPrice(category, newPrice);
      setAidatPrices((prevPrices) =>
        prevPrices.map((priceInfo) =>
          priceInfo.category === category ? { ...priceInfo, price: newPrice } : priceInfo
        )
      );
      alert("Fiyat güncellendi !");
      setEditingPrice({ ...editingPrice, [category]: "" });
    } catch (error) {
      alert("Fiyat güncellenirken bir hata oluştu.");
    }
  };

  if (loading) {
    return <div style={styles.loadingText}>Yükleniyor...</div>;
  }

  if (!membre || membre?.specialRole !== "Administrator") {
    return <Unauthorized />;
  }

  return (
    <div style={styles.formContainer}>
      <button style={styles.backButton} onClick={() => router.back()}>
        <FaArrowLeft size={18} style={styles.backIcon} /> Geri
      </button>
      <h1 style={styles.formTitle}>Aidat Fiyatları</h1>
      <p style={styles.formDescription}>Kategorilere göre mevcut fiyatlar:</p>

      <div style={styles.priceListContainer}>
        {aidatPrices.map((priceInfo, index) => (
          <div key={`${priceInfo.category}-${priceInfo.price}-${index}`} style={styles.priceItem}>
            <p style={styles.priceCategory}>{priceInfo.category}</p>
            <div style={styles.priceContainer}>
              <input
                type="text"
                value={editingPrice[priceInfo.category] || priceInfo.price}
                onChange={(e) => setEditingPrice({ ...editingPrice, [priceInfo.category]: e.target.value })}
                style={styles.priceInput}
              />
              <span style={styles.euroSymbol}>€</span>
              <button
                onClick={() => handleUpdatePrice(priceInfo.category)}
                style={styles.updateButton}
              >
                Valider
              </button>
            </div>
          </div>
        ))}
      </div>
      {/*
      <h2 style={styles.addCategoryTitle}>Yeni Kategori Ekle</h2>
      <div style={styles.addCategoryContainer}>
        <input
          type="text"
          placeholder="Yeni kategori"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Fiyat"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddCategory} style={styles.addButton}>
          Ekle
        </button>
      </div>
      */}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  formContainer: {
    padding: "20px",
    maxWidth: "100%",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "'Nunito', sans-serif",
  },
  formTitle: {
    fontSize: "1.6rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
  },
  formDescription: {
    fontSize: "1rem",
    color: "#777",
    marginBottom: "20px",
  },
  priceListContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px",
  },
  priceItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  priceCategory: {
    fontSize: "1rem",
    color: "#555",
    fontWeight: "500",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
  },
  priceInput: {
    fontSize: "1.2rem",
    color: "#D9534F",
    border: "1px solid #ddd",
    padding: "8px",
    width: "45%",
    borderRadius: "6px",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  euroSymbol: {
    marginLeft: "5px",
    fontSize: "1.2rem",
    color: "#D9534F",
  },
  updateButton: {
    fontSize: "1rem",
    padding: "8px 12px",
    backgroundColor: "#D9534F",
    color: "#fff",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    marginLeft: "10px",
  },
  addCategoryTitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    marginTop: "20px",
    marginBottom: "12px",
    color: "#333",
  },
  addCategoryContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    marginTop: "20px",
  },
  input: {
    fontSize: "1rem",
    padding: "12px",
    width: "80%",
    borderRadius: "6px",
    border: "1px solid #ddd",
    transition: "all 0.3s ease",
  },
  addButton: {
    fontSize: "1.1rem",
    padding: "12px 18px",
    backgroundColor: "#D9534F",
    color: "#fff",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    width: "80%",
    transition: "background-color 0.3s ease",
  },
  loadingText: {
    fontSize: "1rem",
    textAlign: "center",
    color: "#888",
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