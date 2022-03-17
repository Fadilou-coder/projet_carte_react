import axios from "axios"

const API_URL =  'https://projet-carte.herokuapp.com/api/';

class AuthService {
    login(email, password) {
        return  axios
            .post(API_URL + 'login',{
                email,
                password
            })
            .then (response => {
                if(response.data.accessToken){
                    localStorage.setItem('token', response.data.accessToken);
                    localStorage.setItem('user', JSON.stringify(response.data.role));
                    localStorage.setItem('id', JSON.stringify(response.data.id));
                }
                return response.data;
            });
    }

    constructor() {
        this.isAuthenticated = false;
    }
    isAuthenticated(){
        return this.isAuthenticated();
    }

}

export const isAuthenticated = () => {
    return !!localStorage.getItem("id");

}

export default new AuthService();
