import { BsCodeSlash } from "react-icons/bs";
import ServerConnection from "../util/ServerConnection";
import { PasswordUtil } from "../util/password-util";

export async function fetchMembreInfo(phone: string): Promise<boolean> {
    const response = await ServerConnection.foundMembreByPhoneNumber(phone);
    return response;
}

export async function checkMail(email: string): Promise<boolean> {
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
    let codeSucess = await ServerConnection.checkVerificationCodeEmail(email, code);

    console.log(codeSucess);

    return(codeSucess);
}

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



export async function sendVerificationCode(email: string): Promise<void> {
    await ServerConnection.sendMailVerificationCode(email);
}