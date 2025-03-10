"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Adresse() {
  const [rue, setRue] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [country, setCountry] = useState("Fransa");
  
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && router.query?.country) {
      setCountry(router.query.country as string);
    }
  }, [router.query, isClient]);

  return (
    <div className="container">
      <h1>{country === "Fransa" ? "Fransız adresinizi giriniz." : "Türk adresinizi giriniz."}</h1>

      <input
        type="text"
        placeholder="Sokak"
        value={rue}
        onChange={(e) => setRue(e.target.value)}
        className="input-field"
      />

      <input
        type="text"
        placeholder="Posta Kodu"
        value={codePostal}
        onChange={(e) => setCodePostal(e.target.value)}
        className="input-field"
      />

      <input
        type="text"
        placeholder="Şehir"
        value={ville}
        onChange={(e) => setVille(e.target.value)}
        className="input-field"
      />

      <input
        type="text"
        placeholder="Ülke"
        value={country}
        disabled
        className="input-field"
      />

      <button onClick={() => alert(rue + " " + codePostal + " " + ville + " " + country)} className="save-button">
        KAYDET
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    margin: "0 auto",
  } as React.CSSProperties,

  h1: {
    fontSize: "18px",
    marginBottom: "20px",
    color: "#333",
  } as React.CSSProperties,

  inputField: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "16px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#f8f8f8",
    boxSizing: "border-box",
  } as React.CSSProperties,

  saveButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontSize: "16px",
    width: "100%",
  } as React.CSSProperties,

  saveButtonHover: {
    backgroundColor: "#45a049",
  } as React.CSSProperties,
};

const AppStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 10px;
  }

  .container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 18px;
    margin-bottom: 20px;
    color: #333;
  }

  .input-field {
    width: 100%;
    padding: 12px 15px;
    font-size: 16px;
    margin-bottom: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #f8f8f8;
    box-sizing: border-box;
  }

  .save-button {
    background-color: #4CAF50;
    color: #fff;
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;
    width: 100%;
  }

  .save-button:hover {
    background-color: #45a049;
  }
`;

// Inserting the CSS into the head
const styleTag = document.createElement("style");
styleTag.innerHTML = AppStyles;
document.head.appendChild(styleTag);