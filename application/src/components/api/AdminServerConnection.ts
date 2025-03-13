import axios from 'axios';
import BACKEND_API from '@/properties/BACKEND_API';
import API_KEY from '@/properties/API_KEY';
import { Membre } from '../interface/Membre';
import { CACHE_ONE_YEAR } from 'next/dist/lib/constants';

/**
 * API class for interacting with the application's database.
 *
 * This class handles server connections, fetching and managing users,
 * and data validation. It sends JSON requests to a Node.js server,
 * which verifies API keys before interacting with the database.
 */
class AdminServerConnection {
    public static async getAllMember(): Promise<any> {
        try {
            const response = await axios.get(`${BACKEND_API.baseURL}/administration/fetchAllMembre`, {
                withCredentials: true,
                headers: {
                    'x-api-key': `${API_KEY.API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
    
            return response.data; 
        } catch (error) {
            console.error("Erreur lors de la récupération des membres :", error);
            throw error; 
        }
    }

    public static async getRecentMember(): Promise<any> {
        try {
            const response = await axios.get(`${BACKEND_API.baseURL}/administration/fetchRecentMembre`, {
                withCredentials: true,
                headers: {
                    'x-api-key': `${API_KEY.API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
    
            return response.data; 
        } catch (error) {
            console.error("Erreur lors de la récupération des membres :", error);
            throw error; 
        }
    }

    public static async updateMember(membre: Membre): Promise<void> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/administration/updateMembre`, {
                id: membre.id,
                nom: membre.nom,
                prenom: membre.prenom,
                telephone: membre.telephone,
                email: membre.email,
                statut: membre.statut,
                adresseFr: membre.adresseFr,
                adresseTr: membre.adresseTr,
                aidatCategory: membre.aidatCategory,
                cenazeFonu: membre.cenazeFonu,
            },
            {    
                withCredentials: true,
                headers: {
                    'x-api-key': API_KEY.API_KEY,
                    'Content-Type': 'application/json',
                }
            });
    
            alert("✅ Üye başarıyla güncellendi!");  

        } catch (error: any) {  
            console.error("❌ Güncelleme sırasında hata oluştu:", error);  
        
            if (error.response && error.response.data && error.response.data.message) {  
                alert(`⚠️ Hata: ${error.response.data.message}`);  
            } else {  
                alert("❌ Beklenmeyen bir hata oluştu.");  
            }  
        
            throw error;  
        }        
    }   
    
    public static async addMember(formData: any): Promise<void> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/administration/addMembre`, {
                nom: formData.nom,
                prenom: formData.prenom,
                telephone: formData.telephone,
                barcode: formData.barcode,
                aidatCategory: formData.aidatCategory,
                cenazeFonu: formData.cenazeFonu,
            },
            {    
                withCredentials: true,
                headers: {
                    'x-api-key': API_KEY.API_KEY,
                    'Content-Type': 'application/json',
                }
            });
    
            alert("✅ Üye başarıyla eklendi!");  

        } catch (error: any) {  
            console.error("❌ Ekleme sırasında hata oluştu:", error);  
        
            if (error.response && error.response.data && error.response.data.message) {  
                alert(`⚠️ Hata: ${error.response.data.message}`);  
            } else {  
                alert("❌ Beklenmeyen bir hata oluştu.");  
            }  
        
            throw error;  
        }        
    }

    public static async getAidat(): Promise<any> {
        try {
            const response = await axios.get(`${BACKEND_API.baseURL}/administration/fetchAidatPrice`, {
                withCredentials: true,
                headers: {
                    'x-api-key': `${API_KEY.API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
    
            return response.data; 
        } catch (error) {
            console.error("Erreur lors de la récupération des prix :", error);
            throw error; 
        }
    }

    public static async fetchMemberAidat(year: number): Promise<any> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/administration/fetchMemberAidat`, {
                year: year,
            },
            {
                withCredentials: true,
                headers: {
                    'x-api-key': `${API_KEY.API_KEY}`,
                    'Content-Type': 'application/json',
                }}
            );
    
            return response.data; 
        } catch (error) {
            console.error("Erreur lors de la récupération des prix :", error);
            throw error; 
        }
    }

    public static async fetchAvailableYears(): Promise<number[]> {
        try {
            const response = await axios.get(`${BACKEND_API.baseURL}/administration/fetchAvailableYears`, {
                withCredentials: true,
                headers: {
                    'x-api-key': `${API_KEY.API_KEY}`,
                    'Content-Type': 'application/json',
                }
            });
    
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des années disponibles :", error);
            throw error;
        }
    }
    

    /*
    public static async addNewAidatCategory(category: any, price: any): Promise<any> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/administration/addNewAidatCategory`, {
                category: category,
                price: price,
            },
            {
                withCredentials: true,
                headers: {
                    'x-api-key': `${API_KEY.API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
    
            return response.data; 
        } catch (error) {
            console.error("Erreur lors de la récupération des prix :", error);
            throw error; 
        }
    }
    */

    public static async editAidatPrice(category: any, price: any): Promise<any> {
        console.log(category, price);
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/administration/editAidatPrice`, {
                category: category,
                price: price,
            },
            {
                withCredentials: true,
                headers: {
                    'x-api-key': `${API_KEY.API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
    
            return response.data; 
        } catch (error) {
            console.error("Erreur lors de la récupération des prix :", error);
            throw error; 
        }
    }

    public static async getPaymentsByMonthAndYear(month: any, year: any): Promise<any> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/administration/payments`, {
                month: month,
                year: year,
            },
            {
                withCredentials: true,
                headers: {
                    'x-api-key': `${API_KEY.API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
    
            return response.data; 
        } catch (error) {
            console.error("Erreur lors de la récupération des paiements :", error);
            throw error; 
        }
    }

    public static async addPayments(formData: any): Promise<any> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/administration/payments/add`, {
                memberId: formData.memberId, 
                reason: formData.reason, 
                year: formData.year, 
                paymentMethod: formData.paymentMethod, 
                amount: formData.amount, 
                receiverId: formData.receiverId 
            },
            {
                withCredentials: true,
                headers: {
                    'x-api-key': `${API_KEY.API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data;
        } catch (error) {
            console.log("Erreur lors de l'enregistrement des paiements : ", error);
        }
    }

    public static async getRecentTransaction(receiverId: number): Promise<any> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/administration/recent-transactions`, {
                receiverId: receiverId,
            },
            {
                withCredentials: true,
                headers: {
                    'x-api-key': `${API_KEY.API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
    
            return response.data; 
        } catch (error) {
            console.error("Erreur lors de la récupération des paiements :", error);
            throw error; 
        }
    }

    public static async deletePayment(transactionId: string): Promise<any> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/administration/deletePayment`, {
                transactionId: transactionId,
            },
            {
                withCredentials: true,
                headers: {
                    'x-api-key': `${API_KEY.API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });
    
            return response.data; 
        } catch (error) {
            console.error("Erreur lors de la récupération des paiements :", error);
            throw error; 
        }
    }
}    

export default AdminServerConnection;