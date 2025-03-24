export interface ConnectedDevice {
    id: number;
    userId: number;
    created_at: string;
    updated_at: string;
    expired_at: string;
    device_info: string;
    ip_address: string;
    last_login: string;
}