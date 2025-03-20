"use client";

import { FaArrowLeft } from "react-icons/fa";
import React from "react";
import { useRouter } from "next/navigation";

const newsArticles = [
  {
    id: 1,
    title: "2025-2027 Yönetim Kurulu",
    description: "Découvrez les membres et les responsabilités du conseil d'administration pour les années 2025-2027.",
    link: "/misc/about/conseil-administration",
    image: "/assets/images/dernek/stock_yonetim.png",
    borderColor: "#ff5c5c",
  },
];

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px",
  background: "linear-gradient(to bottom right,rgb(255, 255, 255),rgb(255, 235, 235))",
  minHeight: "100vh",
  fontFamily: "'San Francisco', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  color: "#333",
} as React.CSSProperties;

const titleStyle = {
  fontSize: "28px",
  fontWeight: "600",
  color: "#2c3e50",
  marginBottom: "20px",
  textAlign: "center",
  letterSpacing: "0.5px",
  lineHeight: "1.2",
} as React.CSSProperties;

const articlesContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "100%",
  maxWidth: "500px",
} as React.CSSProperties;

const articleCardStyle = (borderColor: string) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  padding: "15px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
  textDecoration: "none",
  borderLeft: `5px solid ${borderColor}`,
  overflow: "hidden",
  alignItems: "flex-start",
  position: "relative",
  width: "90%",
}) as React.CSSProperties;

const articleCardHoverStyle = {
  transform: "translateY(-5px)",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
};

const articleImageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "12px",
} as React.CSSProperties;

const articleTitleStyle = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#2c3e50",
  marginBottom: "8px",
};

const articleDescriptionStyle = {
  fontSize: "14px",
  color: "#7f8c8d",
  marginBottom: "15px",
  lineHeight: "1.4",
  flex: 1,
};

const articleButtonStyle = (borderColor: string) => ({
  backgroundColor: borderColor,
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "30px",
  textDecoration: "none",
  fontWeight: "600",
  textAlign: "center",
  transition: "background-color 0.3s ease, transform 0.2s ease",
  display: "inline-block",
  border: "none",
  outline: "none",
  boxShadow: "none",
  cursor: "pointer",
}) as React.CSSProperties;

const buttonContainer = {
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
};

const backButton = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  backgroundColor: "#ff5c5c",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "25px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "500",
  transition: "background-color 0.3s ease",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  position: "absolute", // Position absolue
  top: "10px",          // Positionné à 10px du haut de la page
  left: "10px",         // Positionné à 10px du côté gauche de la page
  zIndex: 10,           // S'assurer qu'il soit au-dessus d'autres éléments
} as React.CSSProperties;


export default function NewsPage() {
  const router = useRouter();

  return (
    <div style={containerStyle}>
      <div style={buttonContainer}>
        <button
          style={backButton}
          onClick={() => router.back()}
        >
          <FaArrowLeft size={18} /> Geri
        </button>
      </div>

      <h1 style={titleStyle}>Derneğimiz Hakkında</h1>

      <div style={articlesContainerStyle}>
        {newsArticles.map((item) => (
          <div
            key={item.id}
            style={{
              ...articleCardStyle(item.borderColor),
              ...articleCardHoverStyle,
            }}
            onClick={() => router.push(item.link)}
          >
            <img src={item.image} alt={item.title} style={articleImageStyle} />
            <h3 style={articleTitleStyle}>{item.title}</h3>
            <p style={articleDescriptionStyle}>{item.description}</p>
            <button
              style={{
                ...articleButtonStyle(item.borderColor),
              }}
              onClick={() => router.push(item.link)}
            >
              Oku
          </button>
          </div>
        ))}
      </div>
    </div>
  );
}