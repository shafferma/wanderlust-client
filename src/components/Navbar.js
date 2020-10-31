import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import {
  Nav,
  NavLink,
  Navbar,
  NavbarBrand,
  NavItem,
  Collapse,
  NavbarToggler,
  Button,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const Sitebar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  let history = useHistory();
  const handleLogout = () => {
    props.logout();
    history.push("/");
  };

  return (
    <div id="navbar">
      <Navbar color="faded" light expand="md">
        <NavbarBrand href="/" className="mr-auto"></NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>

            {!props.isLoggedIn ? (
              <>
                <NavItem>
                  <NavLink href="/search">Search</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/register">Register</NavLink>
                </NavItem>
              </>
            ) : null}
            {props.isLoggedIn ? (
              <>
                <NavItem>
                  <NavLink href="/trips">Trips</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/search">Search</NavLink>
                </NavItem>
                <NavItem>
                  <Button onClick={handleLogout}>Logout</Button>
                </NavItem>
              </>
            ) : null}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Sitebar;
