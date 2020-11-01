import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
//Fetch url: https://wanderlust-travel-hhsk.herokuapp.com/user/login
import { useHistory } from "react-router-dom";
import "../styles/LoginPage.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_API_URL + "/user/login", {
      method: "POST",
      body: JSON.stringify({
        user: { username: username, password: password },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("Login not valid, please try again");
        } else {
          props.updateToken(data.sessionToken);
          // direct the user to the trips page after login
          history.push("/trips");
        }
      });
  };
  return (
    <div id="divMain">
      <div id="loginForm">
        <h1>Login</h1>
        <Form id="formBody" onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              value={username}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              value={password}
            />
          </FormGroup>
          <Button id="loginButton" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
