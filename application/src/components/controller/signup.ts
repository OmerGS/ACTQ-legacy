import ServerConnection from '@/components/util/ServerConnection';

export async function handleSignup(phoneNumber: string) {
    if (!phoneNumber) {
        alert("Telefon numarasi giriniz !");
        return; 
    }

    const cleanedPhoneNumber = phoneNumber.replace('+', '');

    console.log(cleanedPhoneNumber);
    ServerConnection.sendVerificationCode(cleanedPhoneNumber);
}
