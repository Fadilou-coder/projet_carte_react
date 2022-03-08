import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginComponent from "./components/loginComponent/LoginComponent";
import Login from './components/login1/Login';
import Navbar from './components/navbar/Navbar';
import AddStructure from './components/structure/AddStructure';
import AddAdmin from './components/admin/AddAdmin';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginComponent} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/login1" component={Login} />
          <Route path="/navbar" component={Navbar} />
          <Route path="/admin" component={AddAdmin} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
