import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Visites from "./components/visites/Visites";
import ListApprenant from "./components/apprenant/ListApprenant";
import Admin from "./components/admin/Admin";
import Structure from "./components/structure/Structure";
import Login from './components/login1/Login';
import Layout from "./components/layout/Layout";

function App() {
  return (
      <>
        <Router>
           {/* <Layout>*/}
              <Switch>
                  <Route path="/layout" component={Layout}/>
                  <Route exact path="/" component={Login}/>
                  <Route  path="/login" component={Login}/>
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
