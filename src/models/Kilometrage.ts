import { Vehicle } from './Vehicle';
export interface Kilometrage {
    id: number,
    date: Date,
    start: number,
    end: number,
    vehicle?:Vehicle
}