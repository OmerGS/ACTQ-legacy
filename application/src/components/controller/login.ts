import { PasswordUtil } from "../util/password-util";
import ServerConnection from "../api/ServerConnection"

export async function login(identifier: string, password: string): Promise<boolean> {   
    if(!identifier || !password) {
        alert("Bütün alanları doldurunuz.");
        return false;
    }

    let response = await ServerConnection.getSaltByIdentifier(identifier);

    if(!response.success) {
        alert(response.message);
    } else {
        let hashedPassword = PasswordUtil.hashPassword(password, response.salt);
        let loginResponse = await ServerConnection.login(identifier, hashedPassword);

        if(!loginResponse.success){
            alert(loginResponse.message);
        } else {
            return(true)
        }
    }

    return false;
}
  