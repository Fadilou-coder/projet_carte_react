import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

//const API_URL =  'https://projet-carte.herokuapp.com/api/';
const API_URL = 'http://localhost:8080/api/';

export const ListAllSuperViseur = () => { return axios.get(API_URL + "superviseurs/", {headers: authHeader()}); }

export const SaveSuperViseur = (data) => { return axios.post(API_URL + "superviseur/create/", data, {headers: authHeader()}); }

export const editSuperViseur = (data, id) => { return axios.put(API_URL + "superviseur/" + id, data, {headers: authHeader()}); }
