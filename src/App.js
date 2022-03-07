import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginComponent from "./components/loginComponent/LoginComponent";

import Visites from "./components/visites/Visites";
import Layout from "./components/layout/Layout";
import ListApprenant from "./components/apprenant/ListApprenant";
import Admin from "./components/admin/Admin";
import Structure from "./components/structure/Structure";
import Login from "./components/login1/Login"
import Navbar from './components/navbar/Navbar';

function App() {
  return (
      <>
        <Router>
           {/* <Layout>*/}
              <Switch>
                  <Route exact path="/" component={LoginComponent}/>
                  <Route  path="/login" component={LoginComponent}/>
                  <Route  path="/login1" component={Login}/>
                  <Route path="/layout" component={Layout}/>
                  <Route  path="/visites" component={Visites}/>
                  <Route  path="/admins" component={Admin}/>
                  <Route  path="/liste_apprenants" component={ListApprenant}/>
                  <Route  path="/structures" component={Structure}/>
                  <Route  path="/navbar" component={Navbar}/>

              </Switch>
            {/*</Layout>*/}
        </Router>
      </>
  );
}

export default App;
