import React from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="mainDiv">
      <Container id="landingTitle">
        <h1 className="title">Wanderlust</h1>
        <p className="sub-title">It's a wide world. Go wandering.</p>
      </Container>
    </div>
  );
};

export default HomePage;
