import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Visites from "./components/visites/Visites";
import ListApprenant from "./components/apprenant/ListApprenant";
import Admin from "./components/admin/Admin";
import Structure from "./components/structure/Structure";
import Login from './components/login1/Login';
import Navbar from './components/navbar/Navbar';
import AddStructure from './components/structure/AddStructure';
import AddAdmin from './components/admin/AddAdmin';



function App() {
  return (
      <>
        <Router>
           {/* <Layout>*/}
              <Switch>
                  <Route exact path="/" component={Login}/>
                  <Route  path="/login" component={Login}/>
                  <Route  path="/visites" component={Visites}/>
                  <Route  path="/admins" component={Admin}/>
                  <Route  path="/liste_apprenants" component={ListApprenant}/>
                  <Route  path="/structures" component={Structure}/>
                  <Route path="/navbar" component={Navbar} />
                  <Route path="/admin" component={AddAdmin} />
                  <Route path="/addstructures" component={AddStructure} />
              </Switch>
            {/*</Layout>*/}
        </Router>
      </>
  );
}

export default App;
