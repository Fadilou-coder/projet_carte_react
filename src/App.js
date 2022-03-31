import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Visites from "./components/visites/Visites";
import ListApprenant from "./components/apprenant/ListApprenant";
import Admin from "./components/admin/Admin";
import Structure from "./components/structure/Structure";
import Login from './components/login1/Login';
import AddAdmin from './components/admin/AddAdmin';
import AddApprenant from './components/apprenant/AddApprenant';
import Layout from "./components/layout/Layout";
import PrivateRoute from "./components/guard/PrivateRoute";
import ErreurPage from "./components/errorPage/ErreurPage";

function App() {
  return (
      <>
        <Router>
           {/* <Layout>*/}
              <Routes>
                  <Route exact path="/" component={Login}/>
                  <Route  path="/login" component={Login}/>
                  {/* <PrivateRoute path="/layout" component={Layout}/>
                  <PrivateRoute  path="/visites" component={Visites}/>
                  <PrivateRoute  path="/admins" component={Admin}/>
                  <PrivateRoute  path="/liste_apprenants" component={ListApprenant}/>
                  <PrivateRoute  path="/structures" component={Structure}/>
                  <PrivateRoute path="/add_admin" component={AddAdmin} />
                  <PrivateRoute path="/add_apprenant" component={AddApprenant} />
                  <PrivateRoute path="*" component={ErreurPage} /> */}
              </Routes>
            {/*</Layout>*/}
        </Router>
      </>
  );
}

export default App;
