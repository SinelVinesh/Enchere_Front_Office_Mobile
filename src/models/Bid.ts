import {User} from "./User";

export interface Bid {
    id: number;
    appUser: User;
    amount: number;
    date: Date;
}