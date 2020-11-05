import React, { useState, useEffect, useRef } from "react";
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
import RegistrationForm from "./RegistrationForm";

const Sitebar = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (event) => {
    if (document.documentElement.scrollTop && !hasScrolled) {
      setHasScrolled(true);
    } else if (!document.documentElement.scrollTop) {
      setHasScrolled(false);
    }
  };

  const toggleNavbar = () => setCollapsed(!collapsed);

  let history = useHistory();
  const handleLogout = () => {
    // clears token
    props.logout();
    // direct user to the homepage
    history.push("/");
  };

  const openRegister = () => setShowRegister(true);
  const closeRegister = () => setShowRegister(false);

  return (
    <div
      id="navbar"
      className={classNames({
        "is-expanded": !collapsed,
        "has-scrolled": hasScrolled,
      })}
    >
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
                  <Button onClick={openRegister}>Register</Button>
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
      <RegistrationForm
        updateToken={props.updateToken}
        open={showRegister}
        close={closeRegister}
      />
    </div>
  );
};

export default Sitebar;

function classNames(classes) {
  return Object.entries(classes)
    .filter(([key, value]) => value)
    .map(([key, value]) => key)
    .join(" ");
}
