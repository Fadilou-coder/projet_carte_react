import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

//const API_URL =  'https://projet-carte.herokuapp.com/api/';
 const API_URL = 'http://localhost:8080/api/';

    export const ListAllVisite = (date) => {
        return axios.get(API_URL + "visites/" + date, {headers: authHeader()});
    }

    export const ListVisitesApp = (date) => { return axios.get(API_URL + "visites/" + date + "/apprenant", {headers: authHeader()}); }

    export const ListVisitesVisteur = (date) => { return axios.get(API_URL + "visites/" + date + "/visiteur", {headers: authHeader()}); }

    export const SaveVisitesApp = (data) => { return axios.post(API_URL + "visites/create/apprenant", data, {headers: authHeader()}); }

    export const SaveCommentApp = (data) => { return axios.post(API_URL + "apprenants/comments", data, {headers: authHeader()}); }

    export const ListCommentsApp = (id) => { return axios.get(API_URL + "apprenants/" + id + "/comments", {headers: authHeader()}); }

    export const SaveVisitesVisieur = (data) => { return axios.post(API_URL + "visites/create/visiteur", data, {headers: authHeader()}); }

    export const SortieApp = (data) => { return axios.post(API_URL + "visites/sortieApprenant", data, {headers: authHeader()}); }

    export const SortieVisiteur = (data) => { return axios.post(API_URL + "visites/sortieVisiteur", data, {headers: authHeader()}); }


    export const ListCommentApp = (id) => { return axios.get(API_URL + "commentaires/" + id + "/apprenant", {headers: authHeader()}); }

    export const updateVisiteur = (data, id) => { return axios.put(API_URL + "visiteur/" + id , data , {headers: authHeader()}); }
