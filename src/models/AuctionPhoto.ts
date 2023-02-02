import {Photo} from "@capacitor/camera";

export interface AuctionPhoto extends Photo {
    photoPath?: string;
}