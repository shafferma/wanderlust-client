import React, {useState, useEffect} from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import TripViewPage from "./views/TripViewPage";
import TripListPage from "./views/TripListPage";
import RegistrationPage from "./views/RegistrationPage";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };
  
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/login">
            <LoginPage updateToken={updateToken}/>
          </Route>
          <Route path="/register">
            <RegistrationPage updateToken={updateToken}/>
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
