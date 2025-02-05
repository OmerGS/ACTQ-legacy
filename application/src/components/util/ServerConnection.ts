import axios from 'axios';
import BACKEND_API from '@/properties/BACKEND_API';
import API_KEY from '@/properties/API_KEY';

/**
 * API class for interacting with the application's database.
 *
 * This class handles server connections, fetching and managing users,
 * and data validation. It sends JSON requests to a Node.js server,
 * which verifies API keys before interacting with the database.
 */
class ServerConnection {
    public static async foundMembreByPhoneNumber(phoneNumber: string): Promise<any> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/membre/foundMembreByPhoneNumber`, {
                telephone: phoneNumber,
            });
    
            return response.data; 
        } catch (error) {
            console.error("Erreur lors de la recherche de l'utilisateur :", error);
            throw error; 
        }
    }
    
    public static async sendVerificationCode(phoneNumber: string): Promise<any> {
        try {
            const response = await axios.post (`${BACKEND_API.baseURL}/verificationcode/ask`, {
                telephone: phoneNumber,
            });
        } catch (error) {
            console.error("Erreur lors de l'envoi du code de vérification :", error);
            throw error; 
        }
    }

    public static async checkVerificationCode(phoneNumber: string, code: string): Promise<any> {
        try {
            const response = await axios.post (`${BACKEND_API.baseURL}/verificationcode/check`, {
                telephone: phoneNumber,
                code: code,
            });

            return response.data.success;
        } catch (error) {
            console.error("Erreur lors de l'envoi du code de vérification :", error);
            throw error; 
        }
    }
}

export default ServerConnection;