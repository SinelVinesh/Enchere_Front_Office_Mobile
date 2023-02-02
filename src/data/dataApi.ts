import { Image } from './../models/Image';
import { Vehicle } from '../models/Vehicle';
import { Response} from './Response'
import { User } from '../models/User';
import axios from 'axios';
import {Category} from "../models/Category";
import {Auction} from "../models/Auction";

// data urls
const host = 
// "https://gestionflotte-production-0361.up.railway.app/"
"http://localhost:8080"
const loginUrl = `${host}/users/login`
const auctionsUrl = `${host}/auctions`


/* api calls */
// Generic
export const getCall = (url: string, auth = false) => {
    let config = {}
    if (auth) {
        config = { headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}` } }
    }
    return axios
        .get(url, config)
        .then((res) => (res.status === 200 ? res : Promise.reject(res)))
        .then((res) => res.data.data)
}

export const postCall = (url: string, data: any, auth = false) => {
    let config = {}
    if (auth) {
        config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('user-token') } }
    }
    return axios
        .post(url, data, config)
        .then((res) => (res.status === 200 ? res : Promise.reject(res)))
        .then((res) => res.data.data)
}

export const putCall = (url: string, data: any, auth = false) => {
    let config = {}
    if (auth) {
        config = { headers: { Authorization: 'Bearer ' + localStorage.getItem('user-token') } }
    }
    return axios
        .put(url, data, config)
        .then((res) => (res.status === 200 ? res : Promise.reject(res)))
        .then((res) => res.data.data)
}

export const login = (username: string, password: string): Promise<User> => {
    return postCall(loginUrl, { username, password })
}

export const getAuctions = (): Promise<Auction[]> => {
    return getCall(auctionsUrl, true)
}


export const getAuction = (id: number) => {
    return {
        id: 1,
        title: "Exemple d'enchere avec un tire assez long",
        description: "Description de l'enchere qui donne plus d'information a l'utilisateur",
        topBid: {
            user: {
                username: "Rasoa"
            },
            amount: 950000,
            date: "2023-02-01T09:00:00"
        },
        category: {
            name: 'Technologie'
        },
        author: {
            username: "Jhonnz"
        },
        startDate: "2023-01-30T13:00:00",
        endDate: "2023-02-17T13:00:00",
    }
}


export const getCategories = async (): Promise<Category[]> => {
    return [
        {
            id: 0,
            name: "Technologie"
        },
        {
            id: 1,
            name: "Vetements"
        },
        {
            id: 2,
            name: "Maison"
        }
    ] as Category[]
}

export const getUser = async (): Promise<User> => {
    return {
        username: "RJean",
        email: "R.Jean@gmail.com",
        birthDate: new Date("1999-01-01"),
        registrationDate: new Date("2021-01-01"),
        accountBalance: 1000000,
        accountUsableBalance: 750000,
    }
}

const vehiclesUrl = host + "vehicles";

export const getVehicles = async () =>
    axios.get(vehiclesUrl)
        .then(res => (res.status == 200 ? res : Promise.reject(res)))
        .then(res => {
            console.log(res.data);
            return res.data as Promise<Response<Vehicle[]>>;
        })
        .then(data => data.data.sort((a,b) => a.id - b.id));

export const userLogin = async (username:string,password:string) => {
    return axios.post(loginUrl,{username:username, password:password})
        .then(res => (res.status == 200 ? res : Promise.reject(res)))
        .then(res => res.data as Promise<Response<User>>)
        .then(data => data.data)
}

export const saveImage = async(vehicle: Vehicle, image:Image) => {
    const vehicleData: Vehicle = {
        id:vehicle.id,
        licensePlate: vehicle.licensePlate,
        kilometrages:vehicle.kilometrages,
        image:image,
        currentInsurance: vehicle.currentInsurance
    }
    const uploadImageUrl = vehiclesUrl + `/${vehicleData.id}/image`;
    return axios.post(uploadImageUrl,vehicleData)
        .then(res => (res.status == 200 ? res : Promise.reject(res)))
        .then(res => res.data as Promise<Response<any>>)
        .then(data => data.message);
}