"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/reusable/Navbar";
import { useMembre } from "../hooks/MemberContext";
import { FaUsers, FaFolder, FaUserSecret, FaWifi, FaBalanceScale, FaPoll, FaSearch, FaBuilding } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Unauthorized from '@/components/reusable/Unauthorized';
import { FaRankingStar } from "react-icons/fa6";
import { hasRole } from "@/components/enum/Role";

export default function Misc() {
  const router = useRouter();
  const { membre } = useMembre();

  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    document.body.style.backgroundColor = "#f9f9f9";
    document.body.style.color = "#333";
  }, []);

  if (!membre) {
    return <Unauthorized />;
  }

  const sortWidgets = (widgets: any) => {
    if (sortOrder === "asc") {
      return widgets.sort((a: any, b: any) => a.label.localeCompare(b.label));
    } else if (sortOrder === "desc") {
      return widgets.sort((a: any, b: any) => b.label.localeCompare(a.label));
    }
    return widgets;
  };

  const filteredWidgets = [
    { label: 'Dernegimiz', icon: <FaBuilding size={38} color="#ff4757" />, route: '/misc/about', color: '#ff4757' },
    { label: 'Anket', icon: <FaPoll size={38} color="#3F51B5" />, route: '/soon', color: '#3F51B5' },
    { label: 'Sosyal Medyalar', icon: <FaUsers size={38} color="#4CAF50" />, route: '/misc/social-network', color: '#4CAF50' },
    { label: 'Belgeler', icon: <FaFolder size={38} color="#FFC107" />, route: '/misc/document', color: '#FFC107' },
    { label: 'Yarişma', icon: <FaRankingStar size={38} color="#B317D3" />, route: '/soon', color: '#B317D3' },
    { label: 'Bağlı Cihazlar', icon: <FaWifi size={38} color="#00C2D1" />, route: '/misc/connected-device', color: '#00C2D1' },
    { label: 'Yasal Bilgiler', icon: <FaBalanceScale size={38} color="#00B894" />, route: '/misc/legal', color: '#00B894' },

    ...(hasRole(membre.specialRole, 'panelAccess') ? [
      { label: 'Yönetici Paneli', icon: <FaUserSecret size={38} color="#1E2A47" />, route: '/panel/actq-core', color: '#1E2A47' }
    ] : [])
  ]
  .filter(widget => widget.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const sortedWidgets = sortWidgets(filteredWidgets);

  const toggleSortOrder = () => {
    if (sortOrder === "default") {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("default");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Hizmetler</h1>

      {/* Barre de recherche */}
      <div 
        style={{
          ...styles.searchInputContainer,
          borderColor: isFocused ? "#FF6347" : "#ccc", 
        }}
      >
        <input 
          type="text" 
          placeholder="Kategoriyi Ara..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)} 
          style={styles.searchInput}
        />
        <FaSearch style={styles.searchIcon} />
      </div>
      
      {/*
      <div style={{ marginBottom: "20px" }}>
        <button style={styles.sortButton} onClick={toggleSortOrder}>
          {sortOrder === "default" ? "Varsayılan" : sortOrder === "asc" ? "A-Z" : "Z-A"}
        </button>
      </div>
      */ }

      {/* Grille des widgets */}
      <div style={styles.gridContainer}>
        {sortedWidgets.map((widget: any, index: any) => (
          <button 
            key={index}
            style={{ ...styles.widget, borderColor: widget.color, borderWidth: 2, borderStyle: "solid" }} 
            onClick={async () => { router.push(widget.route); }}
          >
            {widget.icon}
            <p style={styles.widgetText}>{widget.label}</p>
          </button>
        ))}
      </div>

      <Navbar />
    </div>
  );
}

const styles = {
  sortButton: {
    backgroundColor: "#FF6347",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer", 
    transition: "background-color 0.3s, transform 0.2s",
  },
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
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "20px",
  },
  searchInputContainer: {
    position: "relative",
    width: "80%",
    maxWidth: "500px",
    marginBottom: "20px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "5px 15px",
  } as React.CSSProperties,
  searchInput: {
    padding: "10px 10px 10px 30px",
    fontSize: "16px",
    width: "100%",
    border: "none",
    outline: "none",
    borderRadius: "8px",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
    color: "#333",
  } as React.CSSProperties,
  searchInputFocus: {
    borderColor: "#FF6347",
  },
  searchIcon: {
    position: "absolute",
    top: "50%",
    left: "15px",
    transform: "translateY(-50%)",
    color: "#999",
  } as React.CSSProperties,
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "15px",
    width: "100%",
    maxWidth: "600px",
  },
  widget: {
    backgroundColor: "#ffffff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  icon: {
    marginBottom: "10px",
  },
  widgetText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#222",
  },
};