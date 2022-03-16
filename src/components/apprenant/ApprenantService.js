import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

const API_URL = 'https://projet-carte.herokuapp.com/api/';
export const ListAllApprenant = () => {
    return axios.get(API_URL + "apprenants/",  {headers: authHeader()});
}

export const putApprenant = (data, id) => {
    return axios.put(API_URL + "apprenants/" + id, data,  {headers: authHeader()});
}
