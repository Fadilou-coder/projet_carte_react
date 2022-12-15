import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

//const API_URL =  'https://projet-carte.herokuapp.com/api/referentiels/';

const API_URL = 'http://localhost:8080/api/referentiels/';

export const ListAllReferentiel = () => {
    return axios.get(API_URL, {headers: authHeader()});
}

export const AddReferentiel = (data) => { return axios.post(API_URL + "create", data, {headers: authHeader()}); }
export const UpdateReferentiel = (data, id) => { return axios.put(API_URL + id, data, {headers: authHeader()}); }
