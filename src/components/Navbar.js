import React, {useState, useEffect} from 'react';
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

const Sitebar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="faded" light expand="md">
        <NavbarBrand href="/" className="mr-auto">
          Wanderlust
        </NavbarBrand>
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
                  <Button onClick={props.logout}>Logout</Button>
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

