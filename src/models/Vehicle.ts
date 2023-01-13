import { Insurance } from './Insurance';
import { Image } from "./Image";
import { Kilometrage } from "./Kilometrage";

export interface Vehicle {
    id: number,
    licensePlate: string,
    kilometrages?:Kilometrage[],
    image: Image,
    currentInsurance:Insurance
}