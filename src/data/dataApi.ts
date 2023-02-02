import { Image } from './../models/Image';
import { Vehicle } from '../models/Vehicle';
import { Response} from './Response'
import { User } from '../models/User';
import axios from 'axios';
import {Category} from "../models/Category";
import {Auction} from "../models/Auction";
import {UserToken} from "../models/UserToken";
import {Preferences} from "@capacitor/preferences";

// data urls
export const host =
// "https://gestionflotte-production-0361.up.railway.app/"
"http://localhost:8080"
const loginUrl = `${host}/users/login`
const auctionsUrl = `${host}/auctions`
const registerUrl = `${host}/users/register`
const categoriesUrl = `${host}/categories`
const auctionUrl = (id: string) => `${auctionsUrl}/${id}`

/* api calls */
// Generic
export const getCall = async (url: string, auth = false) => {
    let config = {}
    if (auth) {
        const { value } = await Preferences.get({key: "userToken"});
        let userToken: UserToken | undefined = undefined
        if(value) {
            userToken = JSON.parse(value) as UserToken
        }
        config = { headers: { Authorization: `Bearer ${userToken?.value}` } }
    }
    return axios
        .get(url, config)
        .then((res) => (res.status === 200 ? res : Promise.reject(res)))
        .then((res) => res.data.data)
}

export const postCall = async (url: string, data: any, auth = false) => {
    let config = {}
    if (auth) {
        const { value } = await Preferences.get({key: "userToken"});
        let userToken: UserToken | undefined = undefined
        if(value) {
            userToken = JSON.parse(value) as UserToken
        }
        config = { headers: { Authorization: `Bearer ${userToken?.value}` } }
    }
    return axios
        .post(url, data, config)
        .then((res) => (res.status === 200 ? res : Promise.reject(res)))
        .then((res) => res.data.data)
}

export const putCall = async (url: string, data: any, auth = false) => {
    let config = {}
    if (auth) {
        const { value } = await Preferences.get({key: "userToken"});
        let userToken: UserToken | undefined = undefined
        if(value) {
            userToken = JSON.parse(value) as UserToken
        }
        config = { headers: { Authorization: `Bearer ${userToken?.value}` } }
    }
    return axios
        .put(url, data, config)
        .then((res) => (res.status === 200 ? res : Promise.reject(res)))
        .then((res) => res.data.data)
}

export const login = (username: string, password: string): Promise<UserToken> => {
    return postCall(loginUrl, { username, password })
}
export const register = (data: User): Promise<UserToken> => {
    return postCall(registerUrl, data)
}

export const getAuctions = (): Promise<Auction[]> => {
    return getCall(auctionsUrl, true)
}

export const saveAuction = (auction: Auction): Promise<Auction> => {
    return postCall(auctionsUrl, auction, true)
}

export const getAuction = (id: string) => {
    return getCall(auctionUrl(id))
}


export const getCategories = async (): Promise<Category[]> => {
    return getCall(categoriesUrl)
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


