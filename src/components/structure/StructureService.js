import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

const API_URL =  'https://projet-carte.herokuapp.com/api/';
//const API_URL = 'http://localhost:9000/api/';

export const ListAllStructure = () => {
    return axios.get(API_URL + "structures/", {headers: authHeader()});
}

export const Addstructure = (data) => { return axios.post(API_URL + "structures/create", data, {headers: authHeader()}); }
export const Bloquerstructure = (id) => { return axios.delete(API_URL + "structures/" + id, {headers: authHeader()}); }
export const DebloquerStructure = (id) => { return axios.put(API_URL + "structures/debloquer/" + id, {}, {headers: authHeader()}); }
