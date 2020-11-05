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

// checks if string has one special character or one number
const validateUsername = RegExp("((?=.*?[0-9]).*|(?=.*?[#?!@$%^&*-]).*)");

const RegistrationForm = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  let history = useHistory();

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      // if fields not filled out, stop
      if (!username || !email || !password) throw "Please fill out all fields";

      // if password is too small, stop
      if (password.length < 5) throw "Password must be 5 or more characters";

      // if username does not have 4 or more characters and/or number or special character
      if (username.length < 4 || !validateUsername.test(username))
        throw "Username must be 4 or more characters and include 1 number and/or special character";

      // if password and passwordConfirm are not the same, stop
      if (password !== passwordConfirm) throw "Passwords do not match";

      // everything passes, submit data
      fetch(process.env.REACT_APP_API_URL + "user/register", {
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
          resetForm();
          history.push("/trips");
        })
        .catch((error) => console.log(error));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div id="register" role="navigation">
      <Modal isOpen={props.open} id="registerModal">
        <ModalHeader className="modalHeader">
          <div id="mainTitle">Welcome to Wanderlust!</div>

          <Button className="closeModal" onClick={props.close}>
            <span>x</span>
          </Button>
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
