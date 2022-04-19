import React, { useEffect, useState} from 'react';
import jwtDecode from "jwt-decode";
import {Redirect, Route} from "react-router-dom";


const PrivateRoute = ({component: Component, ...rest }) => {
    // vérifier le jeton avant de rendre la route.
    // const auth = useSelector(state => state.auth)

    const [isAuthenticated, setIsAuthenticated] = useState(null)

    useEffect(()=> {
        let token = localStorage.getItem('token')
        if(token) {
            let tokenExpiration = jwtDecode(token).exp;
            let dateNow = new  Date();

            if(tokenExpiration < dateNow.getTime() / 1000) {
                setIsAuthenticated(false)
            } else {
                setIsAuthenticated(true)
                if(localStorage.getItem('user') === '["ADMIN"]' && window.location.pathname !== '/visites'){
                    setIsAuthenticated(null);
                }
            }
        } else {
            setIsAuthenticated(false)
        }
    },[])

    if(isAuthenticated === null) {
        return (
            <Route {...rest} render={props =>
                    <Redirect to="/tableau_de_bord"/>
            }
            />
        )
    }
    return (
        <Route {...rest} render={props =>
            !isAuthenticated ? (
                <Redirect to="/"/>
            ) : (
                <Component {...props}/>
            )
        }
        />
    );
};

export default PrivateRoute;
