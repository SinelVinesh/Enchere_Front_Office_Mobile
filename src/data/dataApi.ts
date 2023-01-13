import { Image } from './../models/Image';
import { Vehicle } from '../models/Vehicle';
import { Response} from './Response'
import { User } from '../models/User';
import axios from 'axios';

// data urls
const host = 
"https://gestionflotte-production-0361.up.railway.app/"
// "http://localhost:8080/"
const vehiclesUrl = host + "vehicles";
const loginUrl = host + "login";

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