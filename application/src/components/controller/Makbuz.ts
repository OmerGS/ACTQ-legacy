import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import ServerConnection from "../api/ServerConnection";

function convertImageToBase64(imagePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imagePath;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (ctx) {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const base64 = canvas.toDataURL("image/png");
                resolve(base64);
            } else {
                reject("Échec du contexte du canvas");
            }
        };

        img.onerror = () => {
            reject("Erreur de chargement de l'image");
        };
    });
}

const normalizeText = (text: string) => {
    let normalizedText = text
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
        .replace(/[İ]/g, 'I');
    
    normalizedText = normalizedText.replace(/\s+/g, ' ').trim();

    return normalizedText;
};

const safeParseFloat = (value: string | null | undefined): number => {
    return value ? parseFloat(value) : 0;
};

export async function generateMakbuz(barcode: string) {
    const response = await ServerConnection.getMakbuzInformation(barcode);
    const databaseInformation = response.clearData;
    const encryptedData: string = response.encryptedData;

    const logoPath = '/assets/logo/actq.png';
    const logoBase64 = await convertImageToBase64(logoPath);

    const qrCodeDataUrl = await QRCode.toDataURL(encryptedData);

    const doc = new jsPDF();
    doc.setFont("Helvetica", "normal");

    const pageHeight = 297;
    const marginTop = 20;
    const lineHeight = 10;
    const lineHeightTitle = 16;
    let yPosition = marginTop + lineHeightTitle;

    const logoWidth = 25;
    const logoHeight = 25;
    const titleWidth = doc.getStringUnitWidth(normalizeText(new Date().getFullYear() + " Makbuz")) * 16 / doc.internal.scaleFactor;
    const titleXPosition = (doc.internal.pageSize.width - titleWidth) / 2;

    doc.addImage(logoBase64, "PNG", 10, marginTop, logoWidth, logoHeight);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);  // Réduction de la taille de la police
    doc.text(normalizeText(new Date().getFullYear() + " Makbuz"), titleXPosition, marginTop + 30);

    yPosition = marginTop + logoHeight + 15;

    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(`Soyisim: ${normalizeText(databaseInformation.nom || "")}`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`Isim: ${normalizeText(databaseInformation.prenom || "")}`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`Üye Numarasi: ${barcode}`, 20, yPosition);
    yPosition += lineHeight + 10;

    // Section AIDAT avec séparation premium
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("AIDAT", 105, yPosition, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(20, yPosition + 5, 190, yPosition + 5);  // Lignes plus petites
    yPosition += lineHeight + 10;
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(`Tutar: ${safeParseFloat(databaseInformation.aidatDue).toFixed(2)}€`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`Ödenen Tutar: ${safeParseFloat(databaseInformation.aidatPaid).toFixed(2)}€`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`Borç: ${safeParseFloat(databaseInformation.borcAidat).toFixed(2)}€`, 20, yPosition);
    yPosition += lineHeight + 10;

    // Section CENAZE FONU
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("CENAZE FONU", 105, yPosition, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(20, yPosition + 5, 190, yPosition + 5);
    yPosition += lineHeight + 10;
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(`Tutar: ${safeParseFloat(databaseInformation.cenazeDue).toFixed(2)}€`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`Ödenen Tutar: ${safeParseFloat(databaseInformation.cenazePaid).toFixed(2)}€`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`Borç: ${safeParseFloat(databaseInformation.borcCenazeFonu).toFixed(2)}€`, 20, yPosition);
    yPosition += lineHeight + 10;

    // Section TOPLAM
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("TOPLAM", 105, yPosition, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(20, yPosition + 5, 190, yPosition + 5);
    yPosition += lineHeight + 10;
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(`Tutar: ${(safeParseFloat(databaseInformation.aidatDue) + safeParseFloat(databaseInformation.cenazeDue)).toFixed(2)}€`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`Ödenen Tutar: ${(safeParseFloat(databaseInformation.aidatPaid) + safeParseFloat(databaseInformation.cenazePaid)).toFixed(2)}€`, 20, yPosition);
    yPosition += lineHeight;
    doc.text(`Borç: ${(safeParseFloat(databaseInformation.borcAidat) + safeParseFloat(databaseInformation.borcCenazeFonu)).toFixed(2)}€`, 20, yPosition);
    yPosition += lineHeight + 15;

    const qrCodeWidth = 35;
    const qrCodeHeight = 35;
    const qrCodeXPosition = doc.internal.pageSize.width - qrCodeWidth - 20;
    doc.addImage(qrCodeDataUrl, "PNG", qrCodeXPosition, pageHeight - qrCodeHeight - 20, qrCodeWidth, qrCodeHeight);

    doc.save(`${new Date().getFullYear()}_Makbuz_${databaseInformation.nom}_${databaseInformation.prenom}.pdf`);
}