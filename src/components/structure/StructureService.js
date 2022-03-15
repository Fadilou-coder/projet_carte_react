import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

const API_URL =  'https://projet-carte.herokuapp.com/api/';

    
    export const ListStructure = () => { return axios.get(API_URL + "structures/", {headers: authHeader()}); }

    export const SortieVisiteur = (data) => { return axios.post(API_URL + "visites/sortieVisiteur", data, {headers: authHeader()}); }
