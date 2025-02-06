"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [membre, setMembre] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeValid, setCodeValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [showLogoutButton, setShowLogoutButton] = useState(true);

  useEffect(() => {
    const fetchedMembre = localStorage.getItem("user");
    if (fetchedMembre) {
      setMembre(JSON.parse(fetchedMembre));
    }
    setLoading(false);
  }, []);

  const handleVerification = () => {
    if (verificationCode === "123456") {
      setCodeValid(true);
      setStep(4);
    } else {
      alert("Geçersiz kod. Lütfen tekrar deneyin.");
    }
  };

  const handleNextStep = () => {
    if (step === 2) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
      if (!emailRegex.test(email)) {
        alert("Lütfen geçerli bir e-posta adresi girin.");
        return;
      } else {
        alert("E-Posta doğrulama kodu gönderildi.");
        setStep(step + 1);
      }
    }
    setStep(step + 1);
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>

      {!membre ? (
        <div style={styles.card}>
          <h2>Hesabınızı oluşturmanız gerekiyor</h2>
          <p>Bu sayfaya erişmek için önce bir hesap oluşturmalısınız.</p>
          <p>Lütfen kaydolun veya giriş yapın.</p>
        </div>
      ) : loading ? (
        <p style={styles.loading}>Üye bilgileri indiriliyor...</p>
      ) : (
        <div style={styles.card}>
          <h2 style={styles.greeting}>
            Merhaba,{" "}
            <span style={styles.name}>{membre[0].prenom + " " + membre[0].nom}</span>
          </h2>
          <p style={styles.message}>Hoş geldiniz, lütfen devam edin.</p>
          
          <div style={styles.buttons}>
            {step === 1 && (
              <div>
                <button
                  style={styles.buttonContinue}
                  onClick={() => {
                    setShowLogoutButton(false); 
                    handleNextStep(); 
                  }}
                >
                  DEVAM
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                />
                <button
                  style={styles.buttonContinue}
                  onClick={handleNextStep}
                >
                  DEVAM
                </button>
              </div>
            )}

            {step === 3 && (
              <div>
                <input
                  type="text"
                  placeholder="Code de validation"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  style={styles.input}
                />
                <button
                  style={styles.buttonContinue}
                  onClick={handleVerification}
                >
                  Kodu doğrula
                </button>
                {codeValid && <p style={styles.successMessage}>Kod dogrulandi !</p>}
              </div>
            )}

            {step === 4 && (
              <div>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                />
                <button
                  style={styles.buttonContinue}
                  onClick={handleNextStep}
                >
                  DEVAM
                </button>
              </div>
            )}

            {step === 5 && (
              <div>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={styles.input}
                />
                <button
                  style={styles.buttonContinue}
                  onClick={handleNextStep}
                >
                  Suivant
                </button>
              </div>
            )}

            {step === 6 && (
              <div>
                <h3>Récapitulatif :</h3>
                <p>Email : {email}</p>
                <p>Mot de passe : {password}</p>
                <p>Date de naissance : {birthDate}</p>
                <button
                  style={styles.buttonContinue}
                  onClick={() => alert("Inscription terminée")}
                >
                  Terminer
                </button>
              </div>
            )}

            {showLogoutButton && (
              <button
                style={styles.buttonLogout}
                onClick={() => {
                  localStorage.removeItem("user");
                  alert("Lütfen yönetim ile iletişime geçin.");
                  router.push("/")
                }}
              >
                Siz değil misiniz?
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "relative" as "relative",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  background: {
    position: "absolute" as "absolute",
    width: "100%",
    height: "100%",
    background: "linear-gradient(-45deg, #00BFAE, #1C1C1C, #8A2BE2, #DC143C)",
    backgroundSize: "400% 400%",
    animation: "gradientBG 12s ease infinite",
  },
  card: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    textAlign: "center" as "center",
    width: "90%",
    maxWidth: "350px", 
    animation: "fadeIn 0.5s ease-in-out",
    position: "relative" as "relative",
    zIndex: 10,
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    whiteSpace: "normal",
  },
  greeting: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#00BFAE",
    marginBottom: "10px",
    textAlign: "center",
  },
  name: {
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis", 
    maxWidth: "100%",
  },
  message: {
    color: "#333",
    fontSize: "16px",
    marginTop: "10px",
  },
  loading: {
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
  },
  buttons: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "10px",
    marginTop: "15px",
  },
  buttonContinue: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    background: "#00BFAE",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  buttonLogout: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    background: "#fff",
    color: "#00BFAE",
    cursor: "pointer",
    transition: "all 0.3s",
    border: "1px solid #00BFAE",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  successMessage: {
    color: "green",
    fontSize: "14px",
    marginTop: "5px",
  },
};
