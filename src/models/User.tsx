import {AppPhoto} from "./AppPhoto";

export interface User {
    id?: number;
    username: string,
    email?: string,
    password?: string,
    birthDate?: Date,
    registrationDate?: Date,
    balance?: number,
    usableBalance?: number,
    photo?: AppPhoto
}