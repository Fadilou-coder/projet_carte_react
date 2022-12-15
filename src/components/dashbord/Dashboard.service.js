import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

//const API_URL = 'https://projet-carte.herokuapp.com/api/';

const API_URL = 'http://localhost:8080/api/';



export const ListApprenantsByPromo = (id) => {
    return axios.get(API_URL + "promo/"+id+"/apprenants", { headers: authHeader() });
}

export const ListPromos = () => {
    return axios.get(API_URL + "promos", { headers: authHeader() });
}


export const nbRetardPromo = (id,datedebut,datefin) => {
    return axios.get(API_URL + "promos/"+id+"/nbrRetardAllApp/"+datedebut+"/"+datefin, { headers: authHeader() });
}


export const nbAbsAllApp = (id,datedebut,datefin) => {
    return axios.get(API_URL + "promos/"+id+"/nbrAbsAllApp/"+datedebut+"/"+datefin, { headers: authHeader() });
}
