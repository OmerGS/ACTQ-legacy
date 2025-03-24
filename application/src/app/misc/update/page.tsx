"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import patchnotesData from '../../../../public/assets/json/patchnote.json';
import { useMembre } from '../../hooks/MemberContext';
import Unauthorized from '@/components/reusable/Unauthorized';
import { FaArrowLeft } from 'react-icons/fa';

interface PatchNote {
  date: string;
  version: string;
  new_features: string[];
  bug_fixes: string[];
  improvements: string[];
}

const PatchNotesPage = () => {
  const [patchnotes, setPatchnotes] = useState<PatchNote[]>([]);
  const router = useRouter();  
  const { membre } = useMembre();

  useEffect(() => {
    setPatchnotes(patchnotesData.patchnotes);
  }, []);

  if (!membre) {
    return (
      <Unauthorized></Unauthorized>
    )
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <div style={styles.container}>
      {/* Bouton de retour */}
      <button onClick={handleBack} style={styles.backButton}><FaArrowLeft size={18}/> GERI</button>
      
      <h1 style={styles.title}>Güncellemeler</h1>
      {patchnotes.map((patch, index) => (
        <div key={index} style={styles.patchContainer}>
          <h2 style={styles.version}>
            {patch.version} - {patch.date}
          </h2>

          {patch.new_features.length > 0 && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Yeni Özellikler:</h3>
              <ul>
                {patch.new_features.map((feature, idx) => (
                  <li key={idx} style={styles.listItem}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {patch.bug_fixes.length > 0 && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Hata Düzeltmeleri:</h3>
              <ul>
                {patch.bug_fixes.map((bug, idx) => (
                  <li key={idx} style={styles.listItem}>{bug}</li>
                ))}
              </ul>
            </div>
          )}

          {patch.improvements.length > 0 && (
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Geliştirmeler:</h3>
              <ul>
                {patch.improvements.map((improvement, idx) => (
                  <li key={idx} style={styles.listItem}>{improvement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f7fc",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  } as React.CSSProperties,
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#ff5c5c",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "500",
    transition: "background-color 0.3s ease",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    position: "absolute",
    top: "10px",
    left: "10px",
    zIndex: 10,
  } as React.CSSProperties,
  title: {
    textAlign: "center",
    fontSize: "36px",
    fontWeight: "700",
    color: "#34495e",
    marginTop: "60px",
    letterSpacing: "1px",
  } as React.CSSProperties,
  patchContainer: {
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    marginBottom: "30px",
    padding: "25px",
    width: "100%",
    maxWidth: "800px",
    transition: "all 0.3s ease-in-out",
  },
  version: {
    fontSize: "24px",
    color: "#2c3e50",
    marginBottom: "20px",
    fontWeight: "600",
    borderBottom: "2px solid #ecf0f1",
    paddingBottom: "10px",
  },
  section: {
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#3498db",
    marginBottom: "12px",
  },
  listItem: {
    fontSize: "16px",
    color: "#7f8c8d",
    marginBottom: "8px",
    listStyleType: "disc",
    marginLeft: "20px",
    lineHeight: "1.5",
  },
};

export default PatchNotesPage;