import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import ApiProvider from "../utils/ApiProvider";
import '../styles/RegistrationPage.css';

const RegistrationPage = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [modalOpen, setModalOpen] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(username && email && password){
      if(password === passwordConfirm){
        fetch("https://wanderlust-travel-hhsk.herokuapp.com/user/register", {
          method: 'POST',
          headers: {
          "Content-Type": "application/json"
          },
          body: JSON.stringify({user: {username, email, password}}),
          })
          .then(response => response.json())
          .then((data) => {
              props.updateToken(data.sessionToken)
          })
          .catch(error => console.log(error));
          }else{
            alert("Passwords do not match!");
          }
        }
        //After successful registration, navigate to TRIP LIST PAGE
    };

  return (
    <div id="register" role='navigation'>
            <Modal isOpen={modalOpen} id="registerModal">
                <ModalHeader>Welcome to Wanderlust!</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="registerUsername">Username</Label>
                            <Input onChange={event => setUsername(event.target.value)} value={username} id="registerUsername"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="registerEmail">Email</Label>
                            <Input onChange={event => setEmail(event.target.value)} value={email} id="registerEmail" type="email"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="registerPassword"> Password</Label>
                            <Input onChange={event => setPassword(event.target.value)} value={password} id="registerPassword" type="password"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="passwordConfirm">Confirm Password</Label>
                            <Input onChange={event => setPasswordConfirm(event.target.value)} value={passwordConfirm} id="passwordConfirm" type="password"></Input>
                        </FormGroup>
                        <Button>Create Account</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
  );
};

export default RegistrationPage;