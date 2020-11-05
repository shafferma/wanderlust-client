import React from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <Container>
      <div id="landingTitle">
        <h1 className="title">Wanderlust</h1>
        <p className="sub-title">It's a wide world. Go wandering.</p>
      </div>
    </Container>
  );
};

export default HomePage;
