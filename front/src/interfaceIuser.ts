export interface IUser {
    _id: string;
    username: string;
    email: string;
    surname?: string;
    mobile?: number;
    companyName?: string;
    country?: string;
    isAdmin: boolean;
    role: { name: string};
}