import axios from 'axios';
import BACKEND_API from '@/properties/BACKEND_API';
import API_KEY from '@/properties/API_KEY';
import PaymentType from '../enum/PaymentType';

/**
 * API class for interacting with the application's database.
 *
 * This class handles server connections, fetching and managing users,
 * and data validation. It sends JSON requests to a Node.js server,
 * which verifies API keys before interacting with the database.
 */
class ServerConnection {
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
    
    public static async sendVerificationCode(phoneNumber: string): Promise<any> {
        try {
            const response = await axios.post (`${BACKEND_API.baseURL}/verificationcode/ask-phone`, {
                telephone: phoneNumber,
            },
            {
                headers: {
                  'x-api-key': `${API_KEY.API_KEY}`,
                  'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error("Erreur lors de l'envoi du code de vérification :", error);
            throw error; 
        }
    }

    public static async checkVerificationCode(phoneNumber: string, code: string): Promise<any> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/verificationcode/check-phone`, {
                    telephone: phoneNumber,
                    code: code,
                },
                {
                    withCredentials: true,
                    headers: {
                        'x-api-key': `${API_KEY.API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                });
    
            return response.data.success;
        } catch (error) {
            console.error("Erreur lors de l'envoi du code de vérification :", error);
            throw error;
        }
    }

    public static async logout(): Promise<any> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/auth/logout`, {}, {
              withCredentials: true
            });
      
            console.log(response.data);
        } catch (error) {
            console.error('Erreur lors de la suppression du token', error);
        }
    }

    public static async checkIfMemberExistsByPhone(phoneNumber: string): Promise<boolean> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/membre/checkIfMemberExistsByPhone`,
                { telephone: phoneNumber },
                {
                    headers: {
                        'x-api-key': API_KEY.API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            return response.data.exists; 
    
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                const status = error.response.status;
    
                if (status === 404) {
                    alert("Numaraya kayıtlı bir kullanıcı bulunamadı.");
                } else if (status === 409) {
                    alert("Bu numaraya kayıtlı bir kullanıcı zaten var.");
                } else if (status === 400) {
                    alert("Telefon numarası giriniz.");
                } else {
                    alert("Kullanaci ararken bir hata oluştu.");
                }
            } else {
                alert("Ag bağlantısı hatası.");
            }
    
            return false;
        }
    }

    public static async sendMailVerificationCode(email: string): Promise<any> {
        try {
            const response = await axios.post (`${BACKEND_API.baseURL}/verificationcode/ask-email`, {
                email: email,
            },
            {
                headers: {
                  'x-api-key': `${API_KEY.API_KEY}`,
                  'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error("Erreur lors de l'envoi du code de vérification :", error);
            throw error; 
        }  
    }

    public static async checkVerificationCodeEmail(email: string, code: string): Promise<any> {
        try {
            const response = await axios.post (`${BACKEND_API.baseURL}/verificationcode/check-email`, {
                email: email,
                code: code,
            },
            {
                headers: {
                  'x-api-key': `${API_KEY.API_KEY}`,
                  'Content-Type': 'application/json',
                },
            });

            return response.data.success;
        } catch (error) {
            console.error("Erreur lors de l'envoi du code de vérification :", error);
            throw error; 
        }
    }

    public static async registerPassword(telephone: string, email: string, password: string, salt: string): Promise<any> {
        try {
            const response = await axios.post (`${BACKEND_API.baseURL}/membre/registerPassword`, {
                telephone: telephone,
                email: email,
                password: password,
                salt: salt,
            },
            {
                headers: {
                  'x-api-key': `${API_KEY.API_KEY}`,
                  'Content-Type': 'application/json',
                },
            });

            return response.data.success;
        } catch (error) {
            console.error("Erreur lors de l'envoi du code de vérification :", error);
            throw error; 
        }
    }

    public static async registerMember(telephone: string, email: string, password: string, salt: string, addressFR: string, addressTR: string, dateNaissance: string): Promise<any> {
        try {
            const response = await axios.post (`${BACKEND_API.baseURL}/membre/registerMember`, {
                telephone: telephone,
                email: email,
                password: password,
                salt: salt,
                addressFR: addressFR,
                addressTR: addressTR,
                dateNaissance: dateNaissance,
            },
            {
                withCredentials: true,
                headers: {
                  'x-api-key': `${API_KEY.API_KEY}`,
                  'Content-Type': 'application/json',
                },
            });

            return response.data.success;
        } catch (error) {
            console.error("Erreur lors de l'envoi du code de vérification :", error);
            throw error; 
        }
    }

    public static async checkMail(email: string): Promise<any> {
        try {
            const response = await axios.post (`${BACKEND_API.baseURL}/membre/checkMail`, {
                email: email,
            },
            {
                headers: {
                  'x-api-key': `${API_KEY.API_KEY}`,
                  'Content-Type': 'application/json',
                },
            });

            return response.data.exists;
        } catch (error) {
            console.error("Erreur lors de la recuperation de l'utilisateur :", error);
            throw error; 
        }  
    }

    public static async login(identifier: string, password: string) : Promise<any> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/membre/login`, {
                identifier: identifier,
                password: password,
            },
            {
                withCredentials: true,
                headers: {
                    'x-api-key': `${API_KEY.API_KEY}`,
                    'Content-Type': 'application/json',
                }
            });

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            throw error;
        }
    }

    public static async getSaltByIdentifier(identifier:string) : Promise<any> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/membre/getSaltByIdentifier`, {
                identifier: identifier,
            },
            {
                headers: {
                    'x-api-key': `${API_KEY.API_KEY}`,
                    'Content-Type': 'application/json',
                }
            });

            return response.data;
        } catch (error) {
            console.error("Erreur lors de la recuperation du sel :", error);
            throw error;
        }
    }



    public static async getFilteredTransaction(barcode: string, reason: string) : Promise<any> {
        try {
            const response = await axios.post(`${BACKEND_API.baseURL}/membre/transaction/filter`, {
                barcode: barcode,
                reason: reason,
            },
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                }
            });

            console.log(response);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la recuperation des paiements.");
            throw error;
        }
    }
}

export default ServerConnection;