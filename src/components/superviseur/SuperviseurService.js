import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

const API_URL =  'https://projet-carte.herokuapp.com/api/';

export const ListAllSuperViseur = () => { return axios.get(API_URL + "superviseurs/", {headers: authHeader()}); }

export const SaveSuperViseur = (data) => { return axios.post(API_URL + "superviseur/create/", data, {headers: authHeader()}); }
