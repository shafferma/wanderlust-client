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
import SearchForm from "./components/SearchForm";
import TripViewPage from "./views/TripViewPage";
import TripListPage from "./views/TripListPage";
import AppContainer from "./components/AppContainer";

const AUTH = {
  isAuthenticated: false,
};

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
      AUTH.isAuthenticated = true;
    }

    console.info("use", sessionToken, AUTH);
  }, [sessionToken]);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
    AUTH.isAuthenticated = false;
  };

  return (
    <Router>
      <AppContainer>
        <Navbar
          updateToken={updateToken}
          logout={clearToken}
          isLoggedIn={!!sessionToken}
        />
        <Switch>
          <Route path="/login">
            <LoginPage updateToken={updateToken} />
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
      </AppContainer>
    </Router>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  console.info("sessionToken", localStorage.getItem("token"));
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("token") ? (
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
}

export default App;
