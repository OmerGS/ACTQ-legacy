export interface Payment {
    id: number;
    reason: string;
    amount: number;
    date: Date;
    memberNom: string;
    memberPrenom: string;
    transactionId: string;
    paymentMethod: string;
    receiverNom: string;
    receiverPrenom: string;
}