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
class AdminServerConnection {
    public static async getMemberByIdentifier(identifier: string): Promise<any> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/membre/getMemberByIdentifier`, {
                identifier: identifier,
            },
            {
                headers: {
                  'x-api-key': `${API_KEY.API_KEY}`,
                  'Content-Type': 'application/json',
                },
            }
            );
    
            return response.data; 
        } catch (error) {
            console.error("Erreur lors de la recherche de l'utilisateur :", error);
            throw error; 
        }
    }
}

export default AdminServerConnection;