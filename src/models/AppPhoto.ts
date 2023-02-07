import {Photo} from "@capacitor/camera";

export interface AppPhoto extends Photo {
    photoPath?: string;
}