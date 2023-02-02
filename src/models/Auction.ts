import {Bid} from "./Bid";

export interface Auction {
    id: number,
    title: string,
    description: string,
    endDate: Date
    topBid: Bid
}