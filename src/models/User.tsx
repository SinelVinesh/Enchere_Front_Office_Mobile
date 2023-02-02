export interface User {
    username: string,
    token?: string,
    isLoggedIn?: boolean,
    email?: string,
    birthDate?: Date,
    registrationDate?: Date,
    accountBalance?: number,
    accountUsableBalance?: number,
}