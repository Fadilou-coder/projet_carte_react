import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

const API_URL = 'https://projet-carte.herokuapp.com/api/';
export const ListAllApprenant = () => {
    return axios.get(API_URL + "apprenants/", { headers: authHeader() });
}

export const putApprenant = (data, id) => {
    return axios.put(API_URL + "apprenants/" + id, data,  
    {
        headers: authHeader(),
        "axios.defaults.headers.common['Content-Type'] ": 'multipart/form-data; boundary=someArbitraryUniqueString',
    });
}
export const saveApprenant = (data) => {
    return axios.post(
        API_URL + "apprenants/create", data,
        {
            headers: authHeader(),
            "axios.defaults.headers.common['Content-Type'] ": 'multipart/form-data; boundary=someArbitraryUniqueString',
        });
}

export const sendCarte = (data) => {
    return axios.post(
        API_URL + "apprenants/sendMail", data,
        { headers: authHeader(),
            "axios.defaults.headers.common['Content-Type'] ": 'multipart/form-data; boundary=someArbitraryUniqueString',
        });
}

export const listAllReferentiels= () => {
    return axios.get(
        API_URL + "referentiels", {
        headers: authHeader()
    });
}

export const ListApprenantsByReferentiel = (id) => {
    return axios.get(API_URL + "referentiel/"+id+"/apprenants", { headers: authHeader() });
}


