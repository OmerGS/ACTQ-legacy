"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/reusable/Navbar";
import { useMembre } from "../../hooks/MemberContext";
import { FaArrowLeft, FaRegFile } from "react-icons/fa";
import { FaBuildingColumns } from "react-icons/fa6";
import { useEffect } from "react";
import Unauthorized from '@/components/reusable/Unauthorized';

export default function Documents() {
  const router = useRouter();
  const { membre } = useMembre();

  useEffect(() => {
    document.body.style.backgroundColor = "#f9f9f9";
    document.body.style.color = "#333";
  }, []);

  if (!membre) {
    return <Unauthorized />;
  }

  const pdfFiles = [
    { 
      name: "Üye Formu", 
      path: "/assets/pdf/Üye_Formu.pdf", 
      icon: <FaRegFile size={38} style={{ color: "#FF6347" }} />,
      addedDate: "2025-03-16",
      type: "PDF",
      borderColor: "#FF6347"
    },
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
      <div style={styles.header}>
        <button onClick={() => router.back()} style={styles.backButton}>
          <FaArrowLeft size={18} /> Geri
        </button>
      </div>
      <h1 style={styles.title}>Belgeler</h1>

      {/* Grille des widgets */}
      <div style={styles.gridContainer}>
        {pdfFiles.length > 0 ? (
          pdfFiles.map((file, index) => (
            <button
              key={index}
              style={{
                ...styles.widget,
                borderColor: file.borderColor,
                borderWidth: 2,
                borderStyle: "solid",
              }}
              onClick={() => downloadPdf(file.path, file.name)}
            >
              {file.icon} {/* Icône dynamique */}
              <p style={styles.widgetText}>{file.name} - <span style={{ fontStyle: "italic", color: "#7F8C8D" }}>{file.type}</span></p>
              <p style={styles.dateText}>Eklenme Tarihi: {file.addedDate}</p>
            </button>
          ))
        ) : (
          <p style={styles.noDocumentsText}>Hiçbir doküman bulunmamaktadır.</p>
        )}
      </div>

      <Navbar />
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: "#f9f9f9",
    color: "#333",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: "100px",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Nunito', sans-serif",
    boxSizing: "border-box",
    textAlign: "center",
  } as React.CSSProperties,
  header: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: "20px",
  },
  backButton: {
    backgroundColor: "#FF6347",
    color: "#fff",
    fontSize: "16px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  backButtonHover: {
    backgroundColor: "#FF4500",
  },
  title: {
    fontSize: "26px",
    fontWeight: "600",
    color: "#222",
    marginBottom: "20px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    width: "100%",
    maxWidth: "700px",
    marginTop: "20px",
  },
  widget: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    border: "2px solid transparent",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
  } as React.CSSProperties,
  widgetHover: {
    transform: "scale(1.05)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
    borderColor: "#FF6347",
  },
  icon: {
    marginBottom: "12px",
    transition: "transform 0.3s ease",
  },
  widgetText: {
    fontSize: "18px", 
    fontWeight: "500",
    color: "#333",
    transition: "color 0.3s ease",
  },
  dateText: {
    fontSize: "14px",
    color: "#7F8C8D",
    marginTop: "5px",
  },
  noDocumentsText: {
    fontSize: "18px",
    color: "#7F8C8D",
    marginTop: "30px",
  },
};
