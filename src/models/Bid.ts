import {User} from "./User";

export interface Bid {
    user: User,
    amount: number,
    date: Date
}