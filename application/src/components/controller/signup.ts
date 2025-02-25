import ServerConnection from '@/components/util/ServerConnection';

export async function handleSendCode(phoneNumber: string): Promise<boolean>{
    if (!phoneNumber) {
        alert("Lütfen telefon numarasını girin!");
        return false; 
    }

    if (!phoneNumber.startsWith('+')) {
        alert("Geçersiz telefon numarası. Numara '+' işaretiyle başlamalıdır.");
        return false;
    }

    const phoneNumberWithoutPlus = phoneNumber.replace('+', '');
    const phoneRegex = /^[0-9]+$/;

    if (!phoneRegex.test(phoneNumberWithoutPlus)) {
        alert("Geçersiz telefon numarası. Numara sadece rakamlardan oluşmalıdır.");
        return false;
    }

    // Vérification du pays (France ou Turquie)
    const countryCode = phoneNumber.substring(0, 3);
    let expectedLength = 12; // Longueur totale attendue (y compris l'indicatif)

    if (countryCode === '+33' || countryCode === '+90') {
        if (phoneNumber.length !== expectedLength) {
            alert(`Geçersiz telefon numarası. ${countryCode} bir numara için, tam olarak ${expectedLength} karakter olmalıdır.`);
            return false;
        }
    } else {
        alert("Geçersiz telefon numarası. Sadece Fransa (+33) veya Türkiye (+90) numaralarını kabul edebiliriz.");
        return false;
    }

    if(!await ServerConnection.checkIfMemberExistsByPhone(phoneNumber)){
        return false;
    }

    const cleanedPhoneNumber = phoneNumber.replace('+', '');

    console.log(cleanedPhoneNumber);
    ServerConnection.sendVerificationCode(cleanedPhoneNumber);
    return true;
}

export async function handleCheckCode(phoneNumber: string, code: string, router: any): Promise<boolean> {
    const cleanedPhoneNumber = phoneNumber.replace('+', '');

    const response = await ServerConnection.checkVerificationCode(cleanedPhoneNumber, code);

    if (!response) {
        alert("Doğrulama kodu yanlış. Lütfen tekrar deneyin.");
        return false;
    }

    const membre = await ServerConnection.getMemberByIdentifier(phoneNumber);
    localStorage.setItem("user", JSON.stringify(membre));

    router.push("/first/");

    return true;
}