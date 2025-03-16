"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { FaArrowLeft, FaRegLightbulb } from "react-icons/fa";
import React from "react";
import { useRouter } from "next/navigation";

const marketContent = [
  {
    id: 1,
    img: "/assets/images/dernek/img1.PNG",
  },
];

const articlesContent = [
  {
    id: 1,
    title: "2025-2027 Yönetim Kurulu",
    description: "Yönetim Kurulu",
    link: "/misc/dernegimiz/conseil-administration",
    icon: <FaRegLightbulb size={24} />,
    borderColor: "#0FF0FF",
  }
];

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  backgroundColor: "#f7f7f7",
  minHeight: "100vh",
  fontFamily: "'Inter', sans-serif",
  color: "#333",
  background: "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(240,240,240,1) 100%)",
} as React.CSSProperties;

const titleStyle = {
  fontSize: "30px",
  fontWeight: "800",
  color: "#2D2D2D",
  marginBottom: "20px",
  textAlign: "center",
} as React.CSSProperties;

const carouselContainerStyle = {
  width: "100%",
  maxWidth: "650px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
  marginBottom: "30px",
};

const carouselImageStyle = {
  width: "100%",
  height: "240px",
  objectFit: "cover",
  borderRadius: "12px",
} as React.CSSProperties;

const articlesContainerStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "20px",
  width: "100%",
  maxWidth: "650px",
  paddingBottom: "50px",
};

const articleCardStyle = (borderColor: any) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#ffffff",
  padding: "18px",
  borderRadius: "15px",
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.12)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
  textDecoration: "none",
  overflow: "hidden",
  backdropFilter: "blur(5px)",
  border: `4px solid ${borderColor}`,
}) as React.CSSProperties;

const articleCardHoverStyle = {
  transform: "translateY(-5px)",
  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
};

const articleTitleStyle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#2D2D2D",
  marginBottom: "12px",
};

const articleDescriptionStyle = {
  fontSize: "14px",
  color: "#666",
  marginBottom: "18px",
  flex: 1,
};

const articleButtonStyle = {
  backgroundColor: "#007BFF",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "25px",
  textDecoration: "none",
  fontWeight: "600",
  textAlign: "center",
  transition: "background-color 0.3s ease",
  display: "inline-block",
} as React.CSSProperties;

const articleIconStyle = {
  marginBottom: "12px",
  color: "#555",
};

const buttonContainer = {
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
};

const backButton = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  backgroundColor: "#FF4B5C",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "20px",
  transition: "background-color 0.3s ease",
};

export default function AssociationPage() {
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


      <h1 style={titleStyle}>Hakkımızda</h1>

      <div style={carouselContainerStyle}>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000 }}
          loop={true}
          spaceBetween={10}
          slidesPerView={1}
        >
          {marketContent.map((item) => (
            <SwiperSlide key={item.id}>
              <a style={{ position: "relative", display: "block" }}>
                <img src={item.img} style={carouselImageStyle} />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div style={articlesContainerStyle}>
        {articlesContent.map((item) => (
          <div
            key={item.id}
            style={{ ...articleCardStyle(item.borderColor), ...articleCardHoverStyle }}
          >
            <div style={articleIconStyle}>{item.icon}</div>
            <h3 style={articleTitleStyle}>{item.title}</h3>
            <p style={articleDescriptionStyle}>{item.description}</p>
            <button onClick={() => router.push(item.link)} style={articleButtonStyle}>Sayfaya Git</button>
          </div>
        ))}
      </div>
    </div>
  );
}