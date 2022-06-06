import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Visites from "./components/visites/Visites";
import ListApprenant from "./components/apprenant/ListApprenant";
import Admin from "./components/admin/Admin";
import Login from './components/login1/Login';
import AddAdmin from './components/admin/AddAdmin';
import AddApprenant from './components/apprenant/AddApprenant';
import Layout from "./components/layout/Layout";
import PrivateRoute from "./components/guard/PrivateRoute";
import ErreurPage from "./components/errorPage/ErreurPage";
import Dashbord from "./components/dashbord/Dashbord";
import Promo from './components/promo/Promo';
import Referentiel from './components/referentiel/Referentiel';
import Superviseur from './components/superviseur/Superviseur';
import Device from './components/devices/Devices';
import AddSuperViseur from "./components/superviseur/AddSuperViseur";
import CarteApprenant from './components/apprenant/CarteApprenant';

function App() {
  return (
      <>p
        <Router>
           {/* <Layout>*/}
              <Switch>
                  <Route exact path="/" component={Login}/>
                  <Route  path="/login" component={Login}/>
                  <Route path="/apprenant/:code" component={CarteApprenant} />
                  <PrivateRoute path="/layout" component={Layout}/>
                  <PrivateRoute  path="/visites" component={Visites}/>
                  <PrivateRoute  path="/admins" component={Admin}/>
                  <PrivateRoute  path="/liste_apprenants" component={ListApprenant}/>
                  <PrivateRoute  path="/devices" component={Device}/>
                  <PrivateRoute path="/add_admin" component={AddAdmin} />
                  <PrivateRoute path="/add_apprenant" component={AddApprenant} />
                  <PrivateRoute path="/tableau_de_bord" component={Dashbord} />
                  <PrivateRoute path="/promos" component={Promo} />
                  <PrivateRoute path="/referentiels" component={Referentiel} />
                  <PrivateRoute path="/superviseurs" component={Superviseur} />
                  <PrivateRoute path="/add_superviseurs" component={AddSuperViseur} />
                  <PrivateRoute path="*" component={ErreurPage} />
              </Switch>
            {/*</Layout>*/}
        </Router>
      </>
  );
}

export default App;
