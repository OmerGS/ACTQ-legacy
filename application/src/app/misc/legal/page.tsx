"use client";

import { useRouter } from 'next/navigation'; 
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const MentionsLegales = () => {
  const router = useRouter();  

  const styles = {
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
    container: {
      fontFamily: 'Roboto, sans-serif',
      backgroundColor: '#f8f9fa',
      color: '#333',
      margin: '0',
      padding: '0',
      minHeight: '100vh',
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '30px 20px',
      boxSizing: 'border-box',
    } as React.CSSProperties,
    header: {
      textAlign: 'center',
      fontSize: '28px',
      fontWeight: '700',
      marginTop: '60px',
      color: '#2c3e50',
    } as React.CSSProperties,
    section: {
      marginBottom: '30px',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '15px',
      color: '#34495e',
    },
    sectionText: {
      fontSize: '16px',
      lineHeight: '1.8',
      color: '#7f8c8d',
    },
    list: {
      listStyleType: 'none',
      paddingLeft: '0',
    },
    listItem: {
      fontSize: '16px',
      lineHeight: '1.8',
      marginBottom: '10px',
      color: '#34495e',
    },
    link: {
      color: '#3498db',
      textDecoration: 'none',
    },
    footer: {
      textAlign: 'center',
      marginTop: '50px',
      fontSize: '14px',
      color: '#95a5a6',
    } as React.CSSProperties,
    '@media (min-width: 768px)': {
      container: {
        padding: '50px 0',
      },
      content: {
        padding: '40px',
      },
      header: {
        fontSize: '36px',
      },
      sectionTitle: {
        fontSize: '24px',
      },
      sectionText: {
        fontSize: '18px',
      },
    },
    '@media (min-width: 1024px)': {
      content: {
        maxWidth: '900px',
      },
      header: {
        fontSize: '40px',
      },
      sectionTitle: {
        fontSize: '26px',
      },
      sectionText: {
        fontSize: '18px',
      },
    },
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div style={styles.container}>
        <button onClick={handleBack} style={styles.backButton}><FaArrowLeft size={18}/> GERI</button>
      
      <div style={styles.content}>
        <h1 style={styles.header}>Mentions Légales</h1>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Présentation du site</h2>
          <p style={styles.sectionText}>
            Le site <strong>ACTQ.fr</strong> est développé par l'Association Culturelle Turque de Quimper et est auto-hébergé. 
            Le responsable du site est <strong>Ömer Faruk GÜNEŞ</strong>, en tant que développeur.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>2. Informations légales</h2>
          <ul style={styles.list}>
            <li style={styles.listItem}><strong>Propriétaire :</strong> Association Culturelle Turque de Quimper</li>
            <li style={styles.listItem}><strong>Adresse :</strong> 205 Route de Douarnenez, 29000 Quimper</li>
            <li style={styles.listItem}><strong>Email :</strong> actqquimper29@gmail.com</li>
            <li style={styles.listItem}><strong>Contact développeur :</strong> contact@omergs.com</li>
          </ul>
        </section>

        <section style={styles.section}>
         <h2 style={styles.sectionTitle}>Éditeur de l'application :</h2>
         <ul style={styles.list}>
             <li style={styles.listItem}><strong>Nom de l'application : </strong>ACTQ</li>
             <li style={styles.listItem}><strong>Développeur : </strong>Ömer Faruk GÜNEŞ</li>
             <li style={styles.listItem}><strong>Contact : </strong><a href="mailto:contact@omergs.com" style={{ color: '#3498db' }}>contact@omergs.com</a></li>
             <li style={styles.listItem}><strong>Site internet : </strong><a href="https://omergs.com" target="_blank" rel="noopener noreferrer" style={{ color: '#3498db' }}>www.omergs.com</a></li>
         </ul>
        </section>


        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>3. Hébergement</h2>
          <p style={styles.sectionText}>
            Le site est auto-hébergé par l'association sur un serveur dédié afin d'assurer un contrôle total et une flexibilité optimale. 
            En parallèle, une sauvegarde du site est déployée sur Vercel pour garantir une redondance et une haute disponibilité en cas de besoin.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>4. Collecte des données personnelles</h2>
          <p style={styles.sectionText}>
            Conformément à la loi "Informatique et Libertés" du 6 janvier 1978, et au Règlement Général sur la Protection des Données (RGPD), l'Association Culturelle Turque de Quimper s'engage à respecter la confidentialité des informations personnelles que l'utilisateur pourrait être amené à fournir.
            Les données collectées sont utilisées uniquement pour les besoins du service. L'utilisateur dispose d'un droit d'accès, de rectification et de suppression de ses données personnelles.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>5. Cookies</h2>
          <p style={styles.sectionText}>
            L'application utilise des cookies exclusivement pour l'authentification de l'utilisateur et le maintien de sa session. 
            Aucune donnée recueillie à travers ces cookies n'est utilisée à des fins publicitaires ou de suivi commercial.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>6. Responsabilité</h2>
          <p style={styles.sectionText}>
            L'Association Culturelle Turque de Quimper décline toute responsabilité en cas de dommages directs ou indirects résultant de l'utilisation de l'application, de son contenu ou de ses services. 
            L'Association Culturelle Turque de Quimper n'est pas responsable des erreurs ou de la mise à jour du site.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>7. Loi applicable</h2>
          <p style={styles.sectionText}>
            Les présentes mentions légales sont régies par la loi française. En cas de litige, compétence exclusive est attribuée aux tribunaux compétents de Quimper.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>8. Modification des mentions légales</h2>
          <p style={styles.sectionText}>
            L'Association Culturelle Turque de Quimper se réserve le droit de modifier les présentes mentions légales à tout moment. 
            Ces modifications entreront en vigueur dès leur publication sur cette page.
          </p>
        </section>

        <footer style={styles.footer}>
          <p>© {new Date().getFullYear()} Association Culturelle Turque de Quimper. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
  );
}

export default MentionsLegales;