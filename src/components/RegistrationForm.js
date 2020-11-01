import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
// import ApiProvider from "../utils/ApiProvider";
import { useHistory } from "react-router-dom";
import "../styles/RegistrationForm.css";

const RegistrationForm = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && email && password) {
      if (password === passwordConfirm) {
        fetch(process.env.REACT_APP_API_URL + "/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: { username, email, password } }),
        })
          .then((response) => response.json())
          .then((data) => {
            props.updateToken(data.sessionToken);
            props.close();
            history.push("/trips");
          })
          .catch((error) => console.log(error));
      } else {
        alert("Passwords do not match!");
      }
    }
  };

  return (
    <div id="register" role="navigation">
      <Modal isOpen={props.open} id="registerModal">
        <ModalHeader className="modalHeader">
          Welcome to Wanderlust!
        </ModalHeader>
        <ModalBody id="modalBody">
          <div id="modalImage"></div>
          <div id="modalForm">
            <Form id="registerForm" onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="registerUsername">Username</Label>
                <Input
                  onChange={(event) => setUsername(event.target.value)}
                  value={username}
                  id="registerUsername"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="registerEmail">Email</Label>
                <Input
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  id="registerEmail"
                  type="email"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="registerPassword"> Password</Label>
                <Input
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  id="registerPassword"
                  type="password"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="passwordConfirm">Confirm Password</Label>
                <Input
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                  value={passwordConfirm}
                  id="passwordConfirm"
                  type="password"
                ></Input>
              </FormGroup>
            </Form>
          </div>
        </ModalBody>
        <ModalFooter className="modalFooter">
          <Button form="registerForm" id="modalSubmitButton" type="submit">
            Create Account
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RegistrationForm;
