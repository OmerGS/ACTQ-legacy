import ServerConnection from "../api/ServerConnection";
import { PasswordUtil } from "../util/password-util";

export async function checkMail(email: string): Promise<boolean> {
    if(!email){
        alert("Lütfen bir e-posta adresi girin.");
        return(false);
    }

    let mailExist = await ServerConnection.checkMail(email);

    console.log(mailExist);

    if (mailExist) {
        alert("Bu e-posta adresi zaten kullanımda. Lütfen başka bir e-posta adresi deneyin.");
        return(false);
    } else {
        return(true);
    }
}

export async function checkVerificationCodeEmail(email: string, code: string): Promise<boolean> {
    if(!code){
        alert("Lütfen doğrulama kodunu girin.");
        return(false);
    }

    let codeSucess = await ServerConnection.checkVerificationCodeEmail(email, code);
    
    if(!codeSucess){
        alert("Doğrulama kodu yanlış. Lütfen tekrar deneyin.");
        return(false);
    } else if(codeSucess){
        return(true);
    }

    alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    return(false);
}

export async function registerMemberIntoDatabase(
    telephone: string,
    email: string, 
    password: string, 
    rueFR: string, 
    codePostalFR: string, 
    villeFR: string,
    rueTR: string | null,   
    codePostalTR: string | null, 
    villeTR: string | null, 
    dateNaissance: string
): Promise<boolean> {
    const addressFR = rueFR + ", " + codePostalFR + ", " + villeFR + ", Fransa";
    let addressTR = "";

    if(rueTR == "" || codePostalTR == "" || villeTR == ""){
        addressTR = "Adres bilgileri yok";
    } else {
        addressTR = rueTR + ", " + codePostalTR + ", " + villeTR + ", Türkiye";
    }


    
    console.log("Telephone : " + telephone);
    console.log("Email : " + email);
    console.log("Password : " + password);
    console.log("AddressFR : " + addressFR);
    console.log("AddressTR : " + addressTR);
    console.log("Date de naissance : " + dateNaissance);

    try {
        const salt = await PasswordUtil.getSalt();
        const hashedPassword = PasswordUtil.hashPassword(password, salt);
    
        const accountCreated = await ServerConnection.registerMember(telephone, email, hashedPassword, salt, addressFR, addressTR, dateNaissance);
    
        console.log("Compte créé : " + accountCreated);
        return accountCreated;
    } catch (error) {
        console.error("Erreur lors de la création du compte :", error);
        return false;
    }
}

/*
export async function registerPassword(telephone: string, email: string, password: string): Promise<boolean> {
    try {
        const salt = await PasswordUtil.getSalt();
        const hashedPassword = PasswordUtil.hashPassword(password, salt);

        const passwordRegistered = await ServerConnection.registerPassword(telephone, email, hashedPassword, salt);

        console.log("Mot de passe enregistré : " + passwordRegistered);
        return passwordRegistered;
    } catch (error) {
        console.error("Erreur lors de l'enregistrement du mot de passe :", error);
        return false;
    }
}
*/

export async function sendVerificationCode(email: string): Promise<void> {
    await ServerConnection.sendMailVerificationCode(email);
}