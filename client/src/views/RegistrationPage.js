import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button, ModalBody, Modal, ModalHeader} from 'reactstrap';
import '../styles/RegistrationPage.css';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(username && email && password){
            if(password === passwordConfirm){

            }else{
                alert("Passwords do not match!");
            }
            fetch('herokudburl/user/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
            })
            .then(response => response.json())
            .catch(error => console.log(error));
        }
        //After successful registration, navigate to TRIP LIST PAGE
    }

    return (
        // id and role are navigation from HomePage to Registration 
        <div id="register" role='navigation'>
            <Modal id="registerModal">
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
                        <Button>Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default RegistrationPage;