import ServerConnection from "../util/ServerConnection";

export async function fetchMembreInfo(phone: string): Promise<boolean> {
    const response = await ServerConnection.foundMembreByPhoneNumber(phone);
    return response;
}