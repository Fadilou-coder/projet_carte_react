import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

//const API_URL =  'https://projet-carte.herokuapp.com/api/promos/';
const API_URL = 'http://localhost:8080/api/promos/';

export const ListAllPromo = () => {
    return axios.get(API_URL, {headers: authHeader()});
}

export const AddPromo = (data) => { return axios.post(API_URL + "create", data, {headers: authHeader()}); }
export const UpdatePromo = (data, id) => { return axios.put(API_URL + id, data, {headers: authHeader()}); }
