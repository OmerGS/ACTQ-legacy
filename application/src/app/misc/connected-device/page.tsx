"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/reusable/Navbar";
import { useMembre } from "../../hooks/MemberContext";
import { FaArrowLeft, FaDesktop, FaMobileAlt, FaPen, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Unauthorized from '@/components/reusable/Unauthorized';
import { ConnectedDevice } from "@/components/interface/ConnectedDevice";
import ServerConnection from "@/components/api/ServerConnection";
import { FaXmark } from "react-icons/fa6";

// Fonction pour analyser l'User-Agent
const getDeviceDetails = (userAgent: string) => {
  const isMobile = /iPhone|Android/i.test(userAgent);
  const isIos = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);

  const isSafari = /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent);
  const isChrome = /Chrome/i.test(userAgent);
  const isFirefox = /Firefox/i.test(userAgent);

  let os = "Inconnu";
  let browser = "Inconnu";

  if (isIos) {
    os = "iOS";
  } else if (isAndroid) {
    os = "Android";
  } else if (/Windows/i.test(userAgent)) {
    os = "Windows";
  } else if (/Mac/i.test(userAgent)) {
    os = "macOS";
  }

  if (isSafari) {
    browser = "Safari";
  } else if (isChrome) {
    browser = "Chrome";
  } else if (isFirefox) {
    browser = "Firefox";
  }

  return { os, browser, isMobile };
};

export default function Document() {
  const router = useRouter();
  const { membre } = useMembre();
  const [connectedDevices, setConnectedDevices] = useState<ConnectedDevice[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#f9f9f9";
    document.body.style.color = "#333";
  }, []);

  useEffect(() => {
    async function fetchConnectedDevices() {
      try {
        if (!membre) return;
        const data = await ServerConnection.getConnectedDevice(membre.barcode);
        setConnectedDevices(data.sessions || []);
      } catch (error) {
        console.error("Erreur lors du chargement des sessions :", error);
      }
    }

    fetchConnectedDevices();
  }, [membre]);

  const handleDeleteDevice = async (deviceId: number) => {
    try {
      await ServerConnection.deleteConnectedDevice(deviceId);
      setConnectedDevices(connectedDevices.filter((device) => device.id !== deviceId));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'appareil :", error);
    }
  };

  if (!membre) {
    return <Unauthorized />;
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.buttonContainer}>
        <button style={styles.backButton} onClick={() => router.back()}>
          <FaArrowLeft size={18} /> Geri
        </button>

        { editMode === false ? (
          <button style={styles.editButton} onClick={() => setEditMode(!editMode)}>
            <FaPen size={18} style={{ marginRight: '8px' }} /> Düzenle
          </button>
        ) : 
          <button style={styles.editButton} onClick={() => setEditMode(!editMode)}>
            <FaXmark size={18} style={{ marginRight: '8px' }} /> Vazgeç
          </button>
        }
      </div>

      <h1 style={styles.title}>Bağlı Cihazlar</h1>

      {/* Liste des sessions */}
      <div style={styles.gridContainer}>
        {connectedDevices.length > 0 ? (
          connectedDevices.map((device, index) => {
            const { os, browser, isMobile } = getDeviceDetails(device.device_info);

            return (
              <div key={index} style={{ ...styles.widget, borderColor: "#4CAF50", borderWidth: 2, borderStyle: "solid" }}>
                {editMode && (
                  <FaTrash
                    size={24}
                    style={{ ...styles.deleteIcon, position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}
                    onClick={() => handleDeleteDevice(device.id)}
                  />
                )}
                {isMobile ? (
                  <FaMobileAlt size={38} style={{ ...styles.icon, color: "#4CAF50" }} />
                ) : (
                  <FaDesktop size={38} style={{ ...styles.icon, color: "#4CAF50" }} />
                )}
                <p style={styles.widgetText}>İlk giriş: {new Date(device.created_at).toLocaleString()}</p>
                <p style={styles.widgetText}>
                  Otomatik çıkış: {new Date(device.expired_at).toLocaleString()}  
                  <br />
                  <span style={{ fontSize: '12px', color: '#888' }}>
                    (Güvenlik sebeplerden dolayı bu tarihten sonra yeniden giriş yapmanız gerekecek.)
                  </span>
                </p>
                <p style={styles.widgetText}>Son aktif: {new Date(device.last_login).toLocaleString()}</p>
                <p style={styles.widgetText}>Cihaz: {os}</p>
                <p style={styles.widgetText}>Tarayıcı: {browser}</p>
              </div>
            );
          })
        ) : (
          <p style={styles.noSessionText}>Hiçbir aktif oturum bulunamadı.</p>
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
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  backButton: {
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
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
    transition: "background-color 0.3s ease",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "20px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
    position: "relative",
  } as React.CSSProperties,
  icon: {
    marginBottom: "10px",
  },
  deleteIcon: {
    color: "#FF4B5C",
  },
  widgetText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#222",
  },
  noSessionText: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#999",
    textAlign: "center",
  } as React.CSSProperties,
};
