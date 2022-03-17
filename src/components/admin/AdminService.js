import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

const API_URL =  'https://projet-carte.herokuapp.com/api/';

    
    export const ListAllAdmin = () => { return axios.get(API_URL + "admin/", {headers: authHeader()}); }

    export const SaveAdmin = () => { return axios.post(API_URL + "admin/create/", {headers: authHeader()}); }

    export const ListVisitesApp = (date) => { return axios.get(API_URL + "visites/" + date + "/apprenant"); }

    export const ListVisitesVisteur = (date) => { return axios.get(API_URL + "visites/" + date + "/visiteur"); }

    export const SaveVisitesApp = (data) => { return axios.post(API_URL + "visites/create/apprenant", data, {headers: authHeader()}); }

    export const SaveVisitesVisieur = (data) => { return axios.post(API_URL + "visites/create/visiteur", data, {headers: authHeader()}); }

    export const SortieApp = (data) => { return axios.post(API_URL + "visites/sortieApprenant", data, {headers: authHeader()}); }

    export const SortieVisiteur = (data) => { return axios.post(API_URL + "visites/sortieVisiteur", data, {headers: authHeader()}); }
