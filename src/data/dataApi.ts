import { User } from '../models/User';
import axios from 'axios';
import {Category} from "../models/Category";
import {Auction} from "../models/Auction";
import {UserToken} from "../models/UserToken";
import {Preferences} from "@capacitor/preferences";

// data urls
export const host =
"https://auctions-app.up.railway.app"
// "http://localhost:8080"
// "http://192.168.88.54:8080"
const loginUrl = `${host}/users/login`
const auctionsUrl = `${host}/auctions`
const registerUrl = `${host}/users/register`
const categoriesUrl = `${host}/categories`
const reloadsUrl = `${host}/reloads/request`
const auctionUrl = (id: string) => `${auctionsUrl}/${id}`
const auctionUrlOffset = (id: number) => `${auctionsUrl}Offset/${id}`
const userUrl = (id: string) => `${host}/users/${id}`
const notificationTokenUrl = `${host}/notificationToken`

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

export const getAuctions = (offset: number): Promise<Auction[]> => {
    return getCall(auctionUrlOffset(offset), true)
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

export const setNotificationToken = (data: any) => {
    return postCall(notificationTokenUrl,data, true)
}

export const getUserProfile = async (): Promise<User> => {
    const {value} = await Preferences.get({key: "userToken"})
    const userToken: UserToken | undefined = value ? JSON.parse(value) as UserToken : undefined
    console.log(userToken)
    return getCall(userUrl(userToken?.user.id?.toString()!))
}

export const updateUserProfile = async (user: User): Promise<User> => {
    const {value} = await Preferences.get({key: "userToken"})
    const userToken: UserToken | undefined = value ? JSON.parse(value) as UserToken : undefined
    return putCall(userUrl(userToken?.user.id?.toString()!), user, true)
}

export const submitReloadRequest = async (data:any): Promise<any> => {
    return postCall(reloadsUrl, data, true)
}
