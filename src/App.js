import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import RegistrationPage from "./views/RegistrationPage";
import SearchForm from "./components/SearchForm";
import TripViewPage from "./views/TripViewPage";
import TripListPage from "./views/TripListPage";

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

  const authenticatedRoutes = () => {
    return sessionToken === window.localStorage.getItem("token") ? (
      <TripListPage token={sessionToken} />
    ) : (
      <RegistrationPage updateToken={updateToken} />
    );
  };
  // A wrapper for <Route> that redirects to the login
  // screen if you're not yet authenticated.
  const PrivateRoute = ({ children, ...rest }) => {
    console.log(!!sessionToken);

    return (
      <Route
        {...rest}
        render={({ location }) =>
          !!sessionToken ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  };
  return (
    <Router>
      <div>
        <Navbar logout={clearToken} isLoggedIn={!!sessionToken} />
        <Switch>
          <Route path="/login">
            <LoginPage updateToken={updateToken} />
          </Route>
          <Route path="/register">
            <RegistrationPage updateToken={updateToken} />
          </Route>
          <PrivateRoute path="/trips/:id">
            <TripViewPage />
          </PrivateRoute>
          <PrivateRoute path="/trips">
            <TripListPage />
          </PrivateRoute>

          <Route path="/search">
            <SearchForm />
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
