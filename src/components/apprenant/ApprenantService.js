import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

const API_URL = 'https://projet-carte.herokuapp.com/api/';
export const ListAllApprenant = () => {
    return axios.get(API_URL + "apprenants/",  {headers: authHeader()});
}

export const saveApprenant = (data) => {
    return axios.post(
        API_URL + "apprenants/create", data,
        { headers: authHeader(),
            "axios.defaults.headers.common['Content-Type'] ": 'multipart/form-data; boundary=someArbitraryUniqueString',
        });
}

export const listAllReferentiels= () => {
    return axios.get(
        API_URL + "referentiels", { headers: authHeader()
        });
}


