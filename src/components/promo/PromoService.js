import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

const API_URL =  'https://projet-carte.herokuapp.com/api/promos/';

export const ListAllPromo = () => {
    return axios.get(API_URL, {headers: authHeader()});
}

export const AddPromo = (data) => { return axios.post(API_URL + "create", data, {headers: authHeader()}); }
export const UpdatePromo = (id) => { return axios.get(API_URL + id, {headers: authHeader()}); }
