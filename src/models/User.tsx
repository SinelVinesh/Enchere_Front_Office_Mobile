export interface User {
    username: string,
    email?: string,
    password?: string,
    birthDate?: Date,
    registrationDate?: Date,
    accountBalance?: number,
    accountUsableBalance?: number,
}