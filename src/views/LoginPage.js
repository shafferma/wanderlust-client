import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import ApiProvider from "../utils/ApiProvider";
//Fetch url: https://wanderlust-travel-hhsk.herokuapp.com/user/login 

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  let handleSubmit = (event) => {
    event.preventDefault();
    //reset error to false when resubmitting
    setError(false);

    ApiProvider.post("/login", {
      username,
      password,
    }) 
      .then((response) => { //TODO once user logs in successfully redirects to..
        props.updateToken(response.data.sessionToken);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };
  return (

     
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit">Login</Button>
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
      </Form>
    </div>
  );
};

export default Login;
