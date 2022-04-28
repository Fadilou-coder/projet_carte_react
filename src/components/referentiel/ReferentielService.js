import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

const API_URL =  'https://projet-carte.herokuapp.com/api/referentiels/';

export const ListAllReferentiel = () => {
    return axios.get(API_URL, {headers: authHeader()});
}

export const AddReferentiel = (data) => { return axios.post(API_URL + "create", data, {headers: authHeader()}); }
export const UpdateReferentiel = (id) => { return axios.get(API_URL + id, {headers: authHeader()}); }
