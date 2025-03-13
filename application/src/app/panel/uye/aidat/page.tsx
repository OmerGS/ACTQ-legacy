"use client";

import React, { useEffect, useState } from "react";
import { useMembre } from "@/app/hooks/MemberContext";
import AdminServerConnection from "@/components/api/AdminServerConnection";
import Unauthorized from "@/components/reusable/Unauthorized";
import { FaArrowLeft, FaFileDownload } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { Membre } from "@/components/interface/Membre";
import jsPDF from "jspdf";

export default function MembresPage() {
    const [membres, setMembres] = useState<Membre[]>([]);
    const [filteredMembres, setFilteredMembres] = useState<Membre[]>([]);    
    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>(2025);
    const { membre } = useMembre();
    const router = useRouter();

    useEffect(() => {
        async function fetchYears() {
            try {
                const years = await AdminServerConnection.fetchAvailableYears();
                setAvailableYears(years);
                setSelectedYear(years[0]);
            } catch (error) {
                console.error("Erreur lors du chargement des années :", error);
            }
        }

        fetchYears();
    }, []);

    useEffect(() => {
        async function fetchMembres() {
            if (!selectedYear) return;
            try {
                const data = await AdminServerConnection.fetchMemberAidat(selectedYear);
                setMembres(data);
                setFilteredMembres(data);
            } catch (error) {
                console.error("Erreur lors du chargement des membres :", error);
            }
        }

        fetchMembres();
    }, [selectedYear]);

    const totalAmountPaid = filteredMembres.reduce((total, membre) => total + parseFloat(membre.amountPaid), 0);
    const totalAmountDue = filteredMembres.reduce((total, membre) => total + parseFloat(membre.amountDue), 0);

    const formatAmount = (amount: number) => {
        return amount.toFixed(2).replace(/\s/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1'); // Formatage avec 2 décimales sans espaces
    };
    
    
    if (!membre || membre?.specialRole !== "Administrator") {
        return <Unauthorized />;
    }

    const exportToPDF = () => {
        const doc = new jsPDF();
    
        doc.setFont("Nunito", "normal");
    
        const normalizeText = (text: string) => {
            return text
                .replace(/[ü]/g, 'u')
                .replace(/[Ü]/g, 'U')
                .replace(/[ş]/g, 's')
                .replace(/[Ş]/g, 'S')
                .replace(/[ı]/g, 'i')
                .replace(/[İ]/g, 'I') 
                .replace(/[ç]/g, 'c') 
                .replace(/[Ç]/g, 'C') 
                .replace(/[ğ]/g, 'g') 
                .replace(/[Ğ]/g, 'G') 
                .replace(/[ö]/g, 'o') 
                .replace(/[Ö]/g, 'O') 
                .replace(/[ı]/g, 'i') 
                .replace(/[İ]/g, 'I');
        };
    
        const pageHeight = 297;
        const marginTop = 20;
        const lineHeight = 10;
        const lineHeightTitle = 16;
        let yPosition = marginTop + lineHeightTitle;
    
        doc.setFontSize(16);
        doc.text(`${normalizeText(selectedYear + " Aidat Listesi")}`, 20, yPosition);
        yPosition += lineHeightTitle;
    
        doc.setFontSize(12);
    
        const totalAmountDueText = `Toplam Tutar: ${normalizeText(formatAmount(totalAmountDue))}€`;
        const totalAmountPaidText = `Alinan Tutar: ${normalizeText(formatAmount(totalAmountPaid))}€`;
        const totalAmountDueRemainingText = `Alinmayan Tutar: ${normalizeText(formatAmount(totalAmountDue - totalAmountPaid))}€`;
    
        doc.text(doc.splitTextToSize(totalAmountDueText, 180), 20, yPosition);
        yPosition += lineHeight;
        doc.text(doc.splitTextToSize(totalAmountPaidText, 180), 20, yPosition);
        yPosition += lineHeight;
        doc.text(doc.splitTextToSize(totalAmountDueRemainingText, 180), 20, yPosition);
        yPosition += lineHeight;
    
        filteredMembres.forEach((membre, index) => {
            if (yPosition + lineHeight > pageHeight) {
                doc.addPage();
                yPosition = marginTop;
            }
            const membreText = `${normalizeText(membre.prenom + " " + membre.nom + ": " + membre.amountPaid + "€ / " + membre.amountDue + "€")}`;
            doc.text(doc.splitTextToSize(membreText, 180), 20, yPosition);
            yPosition += lineHeight;
        });
    
        doc.save(`${selectedYear}_Aidat_Listesi.pdf`);
    };

    return (
        <div style={styles.container}>
            <div style={styles.backButtonContainer}>
                <button style={styles.backButton} onClick={() => router.back()}>
                    <FaArrowLeft size={18} style={styles.backIcon} /> Geri
                </button>

                {/* Bouton d'exportation en PDF */}
                <button onClick={exportToPDF} style={styles.exportButton}>
                    <FaFileDownload size={24} style={styles.backIcon} /> PDF olarak indir
                </button>
            </div>

            <h2 style={styles.title}>Aidat Listesi</h2>

            {/* Affichage des totaux */}
            <div style={styles.totalContainer}>
                <div style={styles.total}>
                    Almamız Gereken Tutar: {formatAmount(totalAmountDue)}€
                </div>
                <div style={styles.total}>
                    Alınan Tutar: {formatAmount(totalAmountPaid)}€
                </div>
                <div style={styles.total}>
                    Kalan Tutar: {formatAmount(totalAmountDue - totalAmountPaid)}€
                </div>
            </div>

            {/* Sélecteur d'année */}
            <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                style={styles.selectYear}
            >
                {availableYears.map((year, index) => (
                    <option key={year ?? index} value={year}>
                        {year}
                    </option>
                ))}
            </select>

            <div style={styles.membreList}>
                {filteredMembres.map((membre) => (
                    <div key={membre.id} style={styles.membreCard}>
                        <div style={styles.membreHeader}>
                            <span style={styles.membreName}>
                                {membre.prenom} {membre.nom}
                            </span>
                            <span style={styles.amount}>
                                {membre.amountPaid}€ / {membre.amountDue}€
                            </span>
                        </div>  
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        backgroundColor: "#F8F8F8",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        color: "#333",
        fontFamily: "'Nunito', sans-serif", 
        maxWidth: "100%",
        boxSizing: "border-box",
    } as React.CSSProperties,
    backButtonContainer: {
        marginBottom: "10px",
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
    exportButton: {
        backgroundColor: "#FF7043",
        color: "white",
        padding: "8px 15px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        borderRadius: "5px",
        fontSize: "14px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    backIcon: {
        marginRight: "8px",
    },
    title: {
        fontSize: "1.6rem",
        fontWeight: "bold",
        marginBottom: "20px",
        textAlign: "center",
        color: "#FF6F61",
    } as React.CSSProperties,
    totalContainer: {
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        backgroundColor: "#FF6F61",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    } as React.CSSProperties,
    total: {
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: "#fff",
    },
    selectYear: {
        marginBottom: "20px",
        padding: "12px",
        fontSize: "1rem",
        width: "100%",
        boxSizing: "border-box",
        backgroundColor: "#F8F8F8",
        border: "1px solid #DCDCDC",
        borderRadius: "5px",
        color: "#333",
    } as React.CSSProperties,
    membreList: {
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    } as React.CSSProperties,
    membreCard: {
        padding: "12px",
        borderBottom: "1px solid #DCDCDC",
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    membreHeader: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
    },
    membreName: {
        fontWeight: "bold",
        fontSize: "1rem",
        color: "#333",
    },
    amount: {
        fontSize: "0.9rem",
        color: "#777",
    }
};