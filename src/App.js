import './App.css';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import LoginComponent from "./components/loginComponent/LoginComponent";

function App() {
  return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={LoginComponent}/>
            <Route  path="/login" component={LoginComponent}/>
          </Switch>
        </Router>
      </>
  );
}

export default App;
