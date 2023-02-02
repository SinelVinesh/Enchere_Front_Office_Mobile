import {User} from "./User";

export interface UserToken {
    id: number;
    value: string;
    user: User;
}