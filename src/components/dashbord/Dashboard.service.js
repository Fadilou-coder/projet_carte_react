import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

const API_URL = 'https://projet-carte.herokuapp.com/api/';



export const ListApprenantsByPromo = (id) => {
    return axios.get(API_URL + "promo/"+id+"/apprenants", { headers: authHeader() });
}

export const ListPromos = () => {
    return axios.get(API_URL + "promos", { headers: authHeader() });
}
