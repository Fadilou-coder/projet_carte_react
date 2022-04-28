import axios from "axios"
import authHeader from "../../core/service/AuthHeader"

const API_URL =  'https://projet-carte.herokuapp.com/api/';
// const API_URL = 'http://localhost:8080/api/';


    export const ListAllAdmin = () => { return axios.get(API_URL + "admin/", {headers: authHeader()}); }

    export const FindById = (id) => { return axios.get(API_URL + "admin/" + id, {headers: authHeader()}); }

    export const FindBySuperAdminId = (id) => { return axios.get(API_URL + "superAdmin/" + id, {headers: authHeader()}); }

    export const FindBySuperviseurId = (id) => { return axios.get(API_URL + "superviseur/" + id, {headers: authHeader()}); }

    export const SaveAdmin = (data) => { return axios.post(API_URL + "admin/create/", data, {headers: authHeader()}); }

    export const BloquerAdmin = (id) => { return axios.delete(API_URL + "admin/" + id, {headers: authHeader()}); }

    export const updateAdmin = (data, id) => { return axios.put(API_URL + "admin/" + id, data, {headers: authHeader()}); }

    export const DebloquerAdmin = (id) => { return axios.put(API_URL + "admin/debloquer/" + id, {}, {headers: authHeader()}); }
