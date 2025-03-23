"use client";

import React, { useState } from "react";
import QrScanner from "qr-scanner";
import AdminServerConnection from "@/components/api/AdminServerConnection";

const styles = {
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "20px",
      backgroundColor: "#fff",
      minHeight: "100vh",
      width: "100%",
      maxWidth: "600px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      color: "#333",
      textAlign: "center",
      overflowX: "hidden",
      margin: "0 auto",
      boxSizing: "border-box",
    } as React.CSSProperties,
    buttonVeriGonder: {
        backgroundColor: "#28a745",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "10px",
        fontSize: "1.1rem",
        fontWeight: "600",
        width: "100%",
        marginBottom: "20px",
        cursor: "pointer",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease, transform 0.2s ease",
      },
  
      buttonTemizle: {
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "10px",
        fontSize: "1.1rem",
        fontWeight: "600",
        width: "100%",
        marginBottom: "20px",
        cursor: "pointer",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease, transform 0.2s ease",
      },
    heading: {
      fontSize: "2rem",
      fontWeight: "600",
      color: "#ff6f61",
      marginBottom: "15px",
    },
    description: {
      fontSize: "1rem",
      color: "#666",
      marginBottom: "30px",
      padding: "0 20px",
    },
    scannerContainer: {
      width: "100%",
      maxWidth: "400px",
      marginBottom: "20px",
    },
    button: {
      backgroundColor: "#f1f1f1",
      color: "#ff6f61",
      padding: "12px 18px",
      borderRadius: "10px",
      fontSize: "1rem",
      fontWeight: "500",
      border: "1px solid #ff6f61",
      width: "100%",
      marginBottom: "15px",
      transition: "background-color 0.3s ease",
      cursor: "pointer",
    },
    buttonActive: {
      backgroundColor: "#ff6f61",
      color: "#fff",
    },
    fileInput: {
      display: "block",
      width: "100%",
      padding: "14px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      marginBottom: "15px",
      color: "#333",
      backgroundColor: "#fff",
      boxSizing: "border-box",
    } as React.CSSProperties,
    fileInputDisabled: {
      backgroundColor: "#f1f1f1",
      cursor: "not-allowed",
    } as React.CSSProperties,
    loadingText: {
      fontSize: "1rem",
      color: "#ff6f61",
      fontWeight: "500",
      marginTop: "10px",
    },
    errorText: {
      fontSize: "1rem",
      color: "#ff3b30",
      fontWeight: "500",
      marginTop: "10px",
    },
    resultContainer: {
        width: '100%',
        padding: '30px',
        backgroundColor: '#fafafa',
        borderRadius: '20px',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        marginTop: '30px',
    },
    resultSection: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '24px',
    } as React.CSSProperties,
    resultItem: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '18px',
        fontSize: '1.2rem',
        padding: '16px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0px 3px 12px rgba(0, 0, 0, 0.1)',
    },
    resultLabel: {
        fontWeight: '600',
        color: '#ff6f61',
    },
    resultValue: {
        fontWeight: '600',
        color: '#2c6b2f',
    },
    resultValueDue: {
        fontWeight: '600',
        color: '#f44336',
    },
    downloadButton: {
      backgroundColor: "#f1f1f1",
      color: "#ff6f61",
      padding: "12px 20px",
      borderRadius: "10px",
      fontSize: "1rem",
      fontWeight: "500",
      width: "100%",
      marginTop: "15px",
      transition: "background-color 0.3s ease",
    },
    buttonActiveDownload: {
      backgroundColor: "#ff6f61",
      color: "#fff",
    },
};

function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    return date.toLocaleString('tr-TR', options); 
}

const getValue = (value: any) => {
    return value != null && value !== '' ? value : 0;
  };
  
  export default function QRCodeScanner() {
    const [result, setResult] = useState<string | null>(null);
    const [qrData, setQrData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [manualInput, setManualInput] = useState<string>("");
    const [inputMode, setInputMode] = useState<'qr' | 'manual'>('qr');
  
    const handleQrCodeRecognized = async (data: string) => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await AdminServerConnection.decryptMakbuzInformation(data);
        if (response?.success) {
          setQrData(response.data);
        } else {
          setQrData(null);
          setError('Geçersiz QR kodu verisi.');
        }
      } catch (error) {
        setError('QR kodu taranırken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
  
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        try {
          const result = await QrScanner.scanImage(file, { returnDetailedScanResult: true });
          handleQrCodeRecognized(result.data);
        } catch (error) {
          alert(error);
        }
      }
    };
  
    const handleManualInput = async () => {
      if (manualInput.trim() === "") {
        setError("Lütfen geçerli bir QR kodu verisi girin.");
        return;
      }
      handleQrCodeRecognized(manualInput);
    };
  
    const handleClear = () => {
      setResult(null);
      setQrData(null);
      setError(null);
      setManualInput("");
      setInputMode('qr');
    };
  
    return (
      <div style={styles.pageContainer}>
        <h2 style={styles.heading}>QR Kod Tarayıcı</h2>
        <p style={styles.description}>
          Bu araç, QR kodlarını tarar ve içindeki bilgileri çözer. Lütfen bir QR kodu yüklemek için bir dosya seçin
          veya manuel olarak veri girin.
        </p>
  
        <div style={styles.scannerContainer}>
          <button
            onClick={() => setInputMode('qr')}
            style={{ ...styles.button, ...(inputMode === 'qr' ? styles.buttonActive : {}) }}
          >
            QR Kodu Tara
          </button>
          <button
            onClick={() => setInputMode('manual')}
            style={{ ...styles.button, ...(inputMode === 'manual' ? styles.buttonActive : {}) }}
          >
            Manuel Veri Gir
          </button>
        </div>
  
        {inputMode === 'qr' && (
          <div style={styles.scannerContainer}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{
                ...styles.fileInput,
                ...(loading ? styles.fileInputDisabled : {}),
              }}
              disabled={loading}
            />
          </div>
        )}
  
        {inputMode === 'manual' && (
          <div style={styles.scannerContainer}>
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Veya manuel veri girin"
              style={styles.fileInput}
            />
            <button
              onClick={handleManualInput}
              style={styles.buttonVeriGonder}
              disabled={loading}
            >
              Veri Gönder
            </button>
          </div>
        )}
  
        {loading && <p style={styles.loadingText}>Veri işleniyor, lütfen bekleyin...</p>}
        {error && <p style={styles.errorText}>{error}</p>}
  
        {qrData && (
                <div style={styles.resultContainer}>
                    <h3 style={{ color: '#00000', marginBottom: '20px' }}>QR Kod Verileri:</h3>

                    {/* Kişisel Bilgiler */}
                    <div style={styles.resultSection}>
                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Tarih :</span>
                            <span style={styles.resultValue}>{getValue(formatDate(qrData.currentDateTime))}</span>
                        </div>

                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Soyisim :</span>
                            <span style={styles.resultValue}>{getValue(qrData.nom)}</span>
                        </div>

                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Isim :</span>
                            <span style={styles.resultValue}>{getValue(qrData.prenom)}</span>
                        </div>
                    </div>

                    {/* Ödenen ve Borçlu Miktarlar */}
                    <div style={styles.resultSection}>
                        <h4 style={{ fontSize: '1.3rem', color: '#333' }}>Aidat:</h4>
                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Ödenecek Tutar:</span>
                            <span style={styles.resultValueDue}>{getValue(qrData.aidatDue)}€</span>
                        </div>
                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Ödenmiş Tutar:</span>
                            <span style={styles.resultValue}>{getValue(qrData.aidatPaid)}€</span>
                        </div>
                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Borç:</span>
                            <span style={styles.resultValue}>{getValue(qrData.borcAidat)}€</span>
                        </div>                        
                    </div>

                    {/* Özel Fonksiyonlar */}
                    <div style={styles.resultSection}>
                        <h4 style={{ fontSize: '1.3rem', color: '#333' }}>Fonlar:</h4>
                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Ödenecek Tutar :</span>
                            <span style={styles.resultValueDue}>{getValue(qrData.cenazeDue)}€</span>
                        </div>

                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Ödenmiş Tutar :</span>
                            <span style={styles.resultValue}>{getValue(qrData.cenazePaid)}€</span>
                        </div>
                        
                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Borç :</span>
                            <span style={styles.resultValueDue}>{getValue(qrData.cenazeDue)}€</span>
                        </div>
                    </div>

                    {/* Toplam ve Borçlar */}
                    <div style={styles.resultSection}>
                        <h4 style={{ fontSize: '1.3rem', color: '#333' }}>Toplam :</h4>
                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Ödenecek Tutar:</span>
                            <span style={styles.resultValue}>{(qrData.totalDue)}€</span>
                        </div>
                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Ödenmiş Tutar :</span>
                            <span style={styles.resultValueDue}>{(qrData.totalPaid)}€</span>
                        </div>
                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Borç:</span>
                            <span style={styles.resultValueDue}>{(qrData.borcTotal)}€</span>
                        </div>
                    </div>
                </div>
            )}
  
        <button onClick={handleClear} style={styles.buttonTemizle}>
          Temizle
        </button>
      </div>
    );
  }