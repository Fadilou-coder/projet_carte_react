import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

const API_URL = 'https://projet-carte.herokuapp.com/api/';
//const API_URL = 'http://localhost:9000/api/';
export const ListAllApprenant = () => {
    return axios.get(API_URL + "apprenants/", { headers: authHeader() });
}

export const FindApprenantByCode = (code) => {
  return axios.get(API_URL + "apprenant/code/" + code, { headers: authHeader() });
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

export const ListApprenantsByPromo = (id) => {
    return axios.get(API_URL + "promo/"+id+"/apprenants", { headers: authHeader() });
}

export const ListPromos = () => {
    return axios.get(API_URL + "promos", { headers: authHeader() });
}

export const ListApprenantsByReferentielByPromo = (idRef, idPr) => {
    return axios.get(API_URL + "referentiel/"+idRef+"/promo/"+idPr+"/apprenants", { headers: authHeader() });
}

export const nbAbsencesApprenant = (id,datedebut,datefin) => {
    return axios.get(API_URL + "apprenants/"+id+"/nbrAbs/"+datedebut+"/"+datefin, { headers: authHeader() });
}

export const nbRetartdsApprenant = (id,datedebut,datefin) => {
    return axios.get(API_URL + "apprenants/"+id+"/nbrRetard/"+datedebut+"/"+datefin, { headers: authHeader() });
}


