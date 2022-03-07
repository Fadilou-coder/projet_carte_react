import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import LoginComponent from "./components/loginComponent/LoginComponent";
import Visites from "./components/visites/Visites";
import Layout from "./components/layout/Layout";
import ListApprenant from "./components/apprenant/ListApprenant";
import Admin from "./components/admin/Admin";
import Structure from "./components/structure/Structure";

function App() {
  return (
      <>
        <Router>
           {/* <Layout>*/}
              <Switch>
                  <Route exact path="/" component={LoginComponent}/>
                  <Route  path="/login" component={LoginComponent}/>
                  <Route path="/layout" component={Layout}/>
                  <Route  path="/visites" component={Visites}/>
                  <Route  path="/admins" component={Admin}/>
                  <Route  path="/liste_apprenants" component={ListApprenant}/>
                  <Route  path="/structures" component={Structure}/>
              </Switch>
            {/*</Layout>*/}
        </Router>
      </>
  );
}

export default App;
