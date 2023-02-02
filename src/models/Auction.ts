import {Bid} from "./Bid";
import {User} from "./User";
import {Category} from "./Category";
import {Image} from "./Image";
import {Photo} from "@capacitor/camera";
import {AuctionPhoto} from "./AuctionPhoto";

interface AuctionState {
    id: number;
    value: string;
}

export interface Auction {
    id?: number;
    title?: string;
    description?: string;
    appUser?: User;
    category?: Category;
    categoryId?: number;
    startDate?: Date;
    startingPrice?: number;
    bidStep?: number;
    images?: AuctionPhoto[];
    endDate?: Date;
    topBid?: Bid;
    auctionState?: AuctionState;

}