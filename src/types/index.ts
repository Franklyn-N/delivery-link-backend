export interface CreateUser {
    email: string;
    userName: string;
    password: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface IPayload {
    email: string;
    _id: string;
}

export interface CreateItem {
    title: string;
    userId: string;
}