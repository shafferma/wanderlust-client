import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import TripViewPage from "./views/TripViewPage";
import TripListPage from "./views/TripListPage";
import RegistrationPage from "./views/RegistrationPage";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegistrationPage />
          </Route>
          <Route path="/trips/:id">
            <TripViewPage />
          </Route>
          <Route path="/trips">
            <TripListPage />
          </Route> 
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

