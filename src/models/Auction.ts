import {Bid} from "./Bid";
import {User} from "./User";
import {Category} from "./Category";

interface AuctionState {
    id: number;
    value: string;
}

export interface Auction {
    id: number;
    title: string;
    description: string;
    appUser: User;
    category: Category;
    startDate: Date;
    endDate: Date;
    startingPrice: number;
    topBid?: Bid;
    auctionState: AuctionState;
}