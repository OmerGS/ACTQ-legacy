"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/reusable/Navbar";
import { useMembre } from "../../hooks/MemberContext";
import { FaArrowLeft, FaFilePdf } from "react-icons/fa";
import { useEffect } from "react";
import Unauthorized from '@/components/reusable/Unauthorized';

export default function Documents() {
  const router = useRouter();
  const { membre } = useMembre();

  useEffect(() => {
    document.body.style.backgroundColor = "#F4F6F8";
    document.body.style.color = "#333";
  }, []);

  if (!membre) {
    return <Unauthorized />;
  }

  const pdfFiles = [
    { name: "Üye Formu", path: "/assets/pdf/Üye_Formu.pdf" },
  ];

  const downloadPdf = async (pdfUrl: string, name: string) => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors du téléchargement du PDF", error);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.backButtonContainer}>
        <button style={styles.backButton} onClick={() => router.back()}>
            <FaArrowLeft size={18} style={styles.backIcon} /> Geri
        </button>
    </div>
    
      <h1 style={styles.title}>Dökümanlar</h1>

      {/* Grille des documents */}
      <div style={styles.gridContainer}>
        {pdfFiles.length > 0 ? (
          pdfFiles.map((file, index) => (
            <div key={index} style={styles.widgetContainer}>
              <button
                style={styles.widget}
                onClick={() => downloadPdf(file.path, file.name)}
              >
                <FaFilePdf size={38} style={styles.icon} />
                <p style={styles.widgetText}>{file.name}</p>
              </button>
            </div>
          ))
        ) : (
          <p>Hiçbir doküman bulunmamaktadır.</p>
        )}
      </div>

      <Navbar />
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: "#F4F6F8",
    color: "#333",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: "100px",
    alignItems: "center",
    padding: "40px",
    fontFamily: "'Roboto', sans-serif",
    boxSizing: "border-box",
    textAlign: "center",
  } as React.CSSProperties,
  backButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", 
  },
  backButton: {
    cursor: "pointer",
    background: "#FF6F61",
    border: "none",
    color: "white",
    padding: "5px 15px",
    height: "40px",
    borderRadius: "5px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  backIcon: {
    marginRight: "8px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: "30px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    width: "100%",
    maxWidth: "600px",
  },
  widgetContainer: {
    display: "flex",
    justifyContent: "center",
  },
  widget: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    border: "1px solid #DADFE1",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    outline: "none",
  } as React.CSSProperties,
  icon: {
    color: "#4E5B6E",
    marginBottom: "15px",
  },
  widgetText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#34495E",
    textTransform: "uppercase",
  } as React.CSSProperties,
};