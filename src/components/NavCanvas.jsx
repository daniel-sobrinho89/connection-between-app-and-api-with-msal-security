import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SignOutButton } from "./SignOutButton";
import { useIsAuthenticated } from "@azure/msal-react";
import { Navbar, Nav, NavDropdown, Container, Offcanvas } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

const options = [
  {
    name: 'Enable both scrolling & backdrop',
    scroll: true,
    backdrop: true,
  },
];

const NavCanvas = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [isOpen, setOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated();

  function OffCanvas({ name, ...props }) {
    const toggleShow = () => setShow((s) => !s);
  
    return (
      <>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" onClick={toggleShow} />                
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav justify variant="pills" defaultActiveKey="/">
                  <NavLink to="/" onClick={handleClose} className="nav-link">Home</NavLink>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

  return (
    <>
      <Navbar collapseOnSelect expand="true" expanded={isOpen} bg="dark" variant="dark">
      <Container fluid style={{ justifyContent: 'start' }}>
          {options.map((props, idx) => (
              <OffCanvas key={idx} {...props} />
          ))}
          <Navbar>
              <Nav className="ms-3">
                  <NavLink to="/" className="nav-link">Home</NavLink>
                  <NavDropdown title="Orders" id="basic-nav-dropdown" >
                    <LinkContainer to="/SimpleSearch">
                      <NavDropdown.Item href="#action/3.2">Orders</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item href="#action/3.2">History</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Forms" id="basic-nav-dropdown" >
                    <LinkContainer to="/SimpleForm">
                      <NavDropdown.Item href="#">Simple Form</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
              </Nav>
          </Navbar>
          { isAuthenticated ? <SignOutButton /> : <></> }
      </Container>
      </Navbar>
    </>
  );
}

export default NavCanvas;