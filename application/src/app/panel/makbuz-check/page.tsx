"use client";

import { useState } from "react";
import QrScanner from "qr-scanner";
import AdminServerConnection from "@/components/api/AdminServerConnection";

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        position: 'relative',
        width: '90%',
        maxWidth: '600px',
        margin: 'auto',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.12)',
        overflowX: 'hidden',
        fontFamily: 'Poppins, sans-serif',
        color: '#333',
    } as React.CSSProperties,
    heading: {
        color: '#4caf50',
        marginBottom: '24px',
        fontSize: '2rem',
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: '1px',
    } as React.CSSProperties,
    description: {
        fontSize: '1.2rem',
        color: '#757575',
        marginBottom: '40px',
        textAlign: 'center',
    } as React.CSSProperties,
    scannerContainer: {
        width: '100%',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '20px',
        backgroundColor: '#f7f7f7',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
        marginBottom: '30px',
    } as React.CSSProperties,
    fileInput: {
        padding: '14px',
        fontSize: '1.1rem',
        borderRadius: '12px',
        border: '1px solid #ccc',
        marginBottom: '20px',
        width: '100%',
        backgroundColor: '#fff',
        cursor: 'pointer',
        boxSizing: 'border-box',
        transition: 'all 0.3s ease',
    } as React.CSSProperties,
    fileInputDisabled: {
        cursor: 'not-allowed',
        backgroundColor: '#e0e0e0',
    } as React.CSSProperties,
    resultContainer: {
        width: '100%',
        padding: '30px',
        backgroundColor: '#fafafa',
        borderRadius: '20px',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        marginTop: '30px',
    } as React.CSSProperties,
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
        color: '#4caf50',
    },
    resultValue: {
        fontWeight: '600',
        color: '#2c6b2f',
    },
    resultValueDue: {
        fontWeight: '600',
        color: '#f44336',
    },
    button: {
        fontWeight: '600',
        padding: '16px 24px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '320px',
        marginTop: '25px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
    },
    clearButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
    },
    downloadButton: {
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
    },
    buttonHover: {
        transform: 'scale(1.05)',
    },
    loadingText: {
        color: '#757575',
        fontSize: '1.1rem',
        fontWeight: '600',
        marginTop: '30px',
    },
    errorText: {
        color: '#f44336',
        fontSize: '1.1rem',
        marginTop: '20px',
        fontWeight: '600',
    },
};

export default function QRCodeScanner() {
    const [result, setResult] = useState<string | null>(null);
    const [qrData, setQrData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleQrCodeRecognized = async (data: string) => {
        console.log("QR Kod tanındı: ", data);
        setLoading(true);
        setError(null);

        try {
            const response = await AdminServerConnection.decryptMakbuzInformation(data);
            if (response?.success) {
                setQrData(response.data);
            } else {
                console.error("Veri hatası: ", response?.message);
                setQrData(null);
                setError('Geçersiz QR kodu verisi.');
            }
        } catch (error) {
            console.error("QR kod verileri çözülürken hata oluştu: ", error);
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
                setResult(result.data);
                handleQrCodeRecognized(result.data);
            } catch (error) {
                alert(error);
            }
        }
    };

    const handleClear = () => {
        setResult(null);
        setQrData(null);
        setError(null);
    };

    const getValue = (value: any) => (value == null ? 0 : value);

    return (
        <div style={styles.pageContainer}>
            <h2 style={styles.heading}>QR Kod Tarayıcı</h2>
            <p style={styles.description}>Bu araç, QR kodlarını tarar ve içindeki bilgileri çözer. Lütfen bir QR kodu yüklemek için bir dosya seçin.</p>

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

            {loading && <p style={styles.loadingText}>Veri işleniyor, lütfen bekleyin...</p>}
            {error && <p style={styles.errorText}>{error}</p>}

            {qrData && (
                <div style={styles.resultContainer}>
                    <h3 style={{ color: '#4caf50', marginBottom: '20px' }}>QR Kod Verileri:</h3>

                    {/* Kişisel Bilgiler */}
                    <div style={styles.resultSection}>
                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Tarih :</span>
                            <span style={styles.resultValue}>{getValue(qrData.currentDateTime)}</span>
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
                            <span style={styles.resultLabel}>Ödenmis Tutar:</span>
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
                            <span style={styles.resultLabel}>Ödenmis Tutar :</span>
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
                            <span style={styles.resultValue}>{getValue(qrData.totalDue)}€</span>
                        </div>
                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Ödenmis Tutar :</span>
                            <span style={styles.resultValueDue}>{getValue(qrData.totalPaid)}€</span>
                        </div>
                        <div style={styles.resultItem}>
                            <span style={styles.resultLabel}>Borç:</span>
                            <span style={styles.resultValueDue}>{getValue(qrData.borcTotal)}€</span>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={handleClear}
                style={{ ...styles.button, ...styles.clearButton }}
                className="hover-effect"
                disabled={loading}
            >
                Temizle
            </button>
        </div>
    );
}
