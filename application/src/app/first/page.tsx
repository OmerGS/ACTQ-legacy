"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sendVerificationCode, checkMail, checkVerificationCodeEmail, registerMemberIntoDatabase } from "@/components/controller/firstTimeConnection";
import axios from "axios";
import BACKEND_API from "@/properties/BACKEND_API";

export default function First() {
  const router = useRouter();
  const [membre, setMembre] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeValid, setCodeValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rueFR, setRueFR] = useState('');
  const [codePostalFR, setCodePostalFR] = useState('');
  const [villeFR, setVilleFR] = useState('');

  const [rueTR, setRueTR] = useState('');
  const [codePostalTR, setCodePostalTR] = useState('');
  const [villeTR, setVilleTR] = useState('');

  const [dateNaissance, setDateNaissance] = useState('');

  const [showLogoutButton, setShowLogoutButton] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`${BACKEND_API.baseURL}/auth/me`, { withCredentials: true });
        
        if (response.data) {
          console.log(response);
          setMembre(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []); 

  const handleVerification = async () => {
    if (await checkVerificationCodeEmail(email, verificationCode)) {
      setCodeValid(true);
      setStep(4);
    } else {
      return;
    }
  };

  const handleNextStep = async () => {
    if (step === 2) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
      if (!emailRegex.test(email)) {
        alert("Lütfen geçerli bir e-posta adresi girin.");
        return;
      } else {
        if(!await checkMail(email)){
          return;
        }
        sendVerificationCode(email);
        alert("E-posta adresinize bir doğrulama kodu gönderildi. Lütfen kontrol edin.");
        setStep(step + 1);
      }
    }

    if (step === 4) {
      if(password.length < 8){
        alert("Sifreniz en az 8 karakter olmalidir.");
        return;
      }
    }

    if(step === 5){
      if(rueFR === '' || codePostalFR === '' || villeFR === ''){
        alert("Fransiz adresinizi eksiksiz giriniz.");
        return;
      }
    }

    if (step === 6) {
      if (rueTR === '' || codePostalTR === '' || villeTR === ''){
        alert("Turk adresinizi eksiksiz giriniz.");
        return;
      }
    }
    
    if(step === 7){
      if (dateNaissance === '') {
        alert("Doğum tarihinizi giriniz.");
        return;
      }
      
      const birthDate = new Date(dateNaissance);
      const today = new Date();
      
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 18) {
        alert("Bir üye en az 18 yaşında olması gerekmektedir.");
        return;
      }    
    


      /*const success = await registerPassword(membre.telephone, email, password);
      if (!success) {
          alert("Bir hata oluştu. Lütfen tekrar deneyin.");
          return;
      }*/

      const success = await registerMemberIntoDatabase(membre.telephone, email, password, rueFR, codePostalFR, villeFR, rueTR, codePostalTR, villeTR, dateNaissance);
      if (!success) {
          alert("Bir hata oluştu. Lütfen tekrar deneyin.");
          return;
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
          <p>Bu sayfaya erişmek için önce telefon numaranızı doğrulamanız gerekmektedir.</p>
          <p>Lütfen telefon numaranızı doğrulayın ve ardından hesap oluşturma sayfasına geçiş yapın.</p>
        </div>
      ) : loading ? (
        <p style={styles.loading}>Üye bilgileri indiriliyor...</p>
      ) : (
        <div style={styles.card}>
          <h2 style={styles.greeting}>
            Merhaba,<br />
            <span style={{ marginBottom: "10px" }}></span>
            <span style={styles.name}>{membre.prenom + " " + membre.nom}</span>
          </h2>


          
          <div style={styles.buttons}>
            {step === 1 && (
              <div>
                <p style={styles.message}>Hoş geldiniz, lütfen devam edin.</p>
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
                <p style={styles.message}>E-Posta adresinizi giriniz.</p>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                />
                <br></br>
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
                <p style={styles.message}>E-Posta adresinize gelen kodu buraya giriniz.</p>
                <input
                  type="text"
                  placeholder="Onaylama kodu"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  style={styles.input}
                />
                <br></br>
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
                <p style={styles.message}>Lütfen bir sifre giriniz, bu sifreyi kimseye paylasmayin.</p>
                <input
                  type="password"
                  placeholder="Sifre"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                />
                <br></br>
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
                <p style={styles.message}>Fransiz adresinizi giriniz.</p>

                <input
                  type="text"
                  placeholder="Sokak"
                  value={rueFR}
                  onChange={(e) => setRueFR(e.target.value)}
                  style={styles.input}
                />

                <input
                  type="text"
                  placeholder="Posta Kodu"
                  value={codePostalFR}
                  onChange={(e) => setCodePostalFR(e.target.value)}
                  style={styles.input}
                />

                <input
                  type="text"
                  placeholder="Sehir"
                  value={villeFR}
                  onChange={(e) => setVilleFR(e.target.value)}
                  style={styles.input}
                />

                <input
                  type="text"
                  placeholder="Ülke"
                  value="Fransa"
                  disabled
                  style={styles.input}
                />
                <br></br>
                <button
                  style={styles.buttonContinue}
                  onClick={handleNextStep}
                >
                  DEVAM
                </button>
              </div>
            )}

            {step === 6 && (
              <div>
                <p style={styles.message}>Veuillez entrer votre adresse TR.</p>

                <input
                  type="text"
                  placeholder="Sokak"
                  value={rueTR}
                  onChange={(e) => setRueTR(e.target.value)}
                  style={styles.input}
                />

                <input
                  type="text"
                  placeholder="Mahalle"
                  value={codePostalTR}
                  onChange={(e) => setCodePostalTR(e.target.value)}
                  style={styles.input}
                />

                <input
                  type="text"
                  placeholder="Sehir"
                  value={villeTR}
                  onChange={(e) => setVilleTR(e.target.value)}
                  style={styles.input}
                />

                <input
                  type="text"
                  placeholder="Ülke"
                  value="Turquie"
                  disabled
                  style={styles.input}
                />
                
                <br />

                <button
                  style={styles.buttonContinue}
                  onClick={handleNextStep}
                >
                  DEVAM
                </button>
              </div>
            )}

            {step === 7 && (
              <div>
                <p style={styles.message}>Dogum tarihinizi giriniz.</p>

                <input
                  type="date"
                  value={dateNaissance}
                  onChange={(e) => setDateNaissance(e.target.value)}
                  style={styles.input}
                />
                <br></br>
                <button
                  style={styles.buttonContinue}
                  onClick={handleNextStep}
                >
                  DEVAM
                </button>
              </div>
            )}

            {step === 8 && (
              <div>
                <h3>Hesap başarıyla oluşturuldu!</h3>
                <br></br>
                <p>Hesabınız başarıyla oluşturuldu. Şimdi giriş yapabilirsiniz.</p>
                <br></br>
                <button
                  style={styles.buttonContinue}
                  onClick={() => window.location.href = '/auth/login'} 
                >
                  Giriş Yap
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
    width: "100%",
    height: "100vh",
    background: "linear-gradient(135deg, #f8f8f8, #ffffff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'SF Pro Display', sans-serif",
  },
  background: {
    position: "absolute" as "absolute", 
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    backgroundSize: "cover",
  },
  card: {
    width: "65%",
    maxWidth: "380px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",  // Type vérifié comme une valeur CSS valide
    alignItems: "center",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    margin: "20px", 
    willChange: "transform, opacity",
  } as React.CSSProperties,
  greeting: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#000",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,    
  name: {
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "22px",
    color: "#FF0000",
    maxWidth: "100%",
    marginLeft: "15px",
  },
  message: {
    color: "#000",
    fontSize: "16px",
    marginTop: "-10px",
    marginBottom: "20px",
  },
  loading: {
    color: "#000",
    fontSize: "18px",
    fontWeight: "500",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
    width: "100%",
  } as React.CSSProperties,
  buttonSkip: {
    marginTop: "10px",
    backgroundColor: "gray",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },  
  buttonContinue: {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    background: "#000",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
    textTransform: "uppercase",
  } as React.CSSProperties,
  buttonLogout: {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "1px solid #000",
    fontSize: "16px",
    fontWeight: "600",
    background: "transparent",
    color: "#000",
    cursor: "pointer",
    transition: "all 0.3s",
    textTransform: "uppercase",
  } as React.CSSProperties,
  input: {
    padding: "12px 18px",
    borderRadius: "12px",
    fontSize: "16px",
    border: "1px solid #000",
    marginBottom: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#000",
  },
  successMessage: {
    color: "green",
    fontSize: "14px",
    marginTop: "5px",
  },
};