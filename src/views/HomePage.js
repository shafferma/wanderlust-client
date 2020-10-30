import React from 'react'
import { Container, Form, FormGroup, Label, Input, Button, } from 'reactstrap'
import { Link } from 'react-router-dom';



const HomePage = () => {



    return (
        <div className="jumbotron">
            <Container>
                <h1 className="display-3">Welcome to Wanderlust!</h1>
                <p className="lead">Your Travel Planning Destination.</p>
                <p>Are you visiting for the you first time? If yes, please click the button below to Register!</p>
                <Button><Link to="/register">Register Here!</Link></Button>
                <p>Not your first time?, Welcome Back!!</p>
                <Button><Link to="/login">Login Here!</Link></Button>
             </Container>
        </div>
    )
}

export default HomePage;