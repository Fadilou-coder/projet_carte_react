import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

const API_URL =  'https://projet-carte.herokuapp.com/api/';

export const ListAllDevice = () => {
    return axios.get(API_URL + "devices/", {headers: authHeader()});
}

export const AddDevice = (data) => { return axios.post(API_URL + "devices/", data, {headers: authHeader()}); }
export const BloquerDevice = (id) => { return axios.delete(API_URL + "devices/" + id, {headers: authHeader()}); }
