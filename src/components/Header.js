import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classes from './Header.module.css';
import logo from '../assets/images/logo.png';
import { FaAngleDown, FaShoppingCart } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

const Navigation = () => {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState('');

  const showDropdown = (e) => {
    setIndex(e.target.id);
    setShow(true);
  };
  const hideDropdown = (e) => {
    setIndex('');
    setShow(false);
  };

  const languageDropdown = (
    <span id="nav-about">
      English <FaAngleDown />
    </span>
  );

  return (
    <Navbar
      expand="md"
      fixed="top"
      className="bg-body-tertiary"
      data-bs-theme="light"
    >
      <Container>
        <Navbar.Brand href="/" className={`m-0 h1 ${classes.brand}`}>
          <img src={logo} alt="weight" className={classes.logo} />
          SHOPBUDDY
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className={classes['nav-margin']} href="#shop">
              <FaShoppingCart />
            </Nav.Link>
            <NavDropdown
              className={classes['nav-margin']}
              title={languageDropdown}
              id="nav-language"
              show={index === 'nav-language' && show}
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
              onClick={showDropdown}
            >
              <NavDropdown.Item href="#action/3.1">Bulgarian</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Spanish</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Portuguese</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className={classes['nav-margin']} href="#shop">
              Shop
            </Nav.Link>
            <Nav.Link className={classes['nav-margin']} href="#contact">
              Contact
            </Nav.Link>
            <Nav.Link className={classes['nav-margin']} href="#signin">
              Sign in
            </Nav.Link>
            <Button variant="outline-dark" className={classes.btn}>
              SIGN UP
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
