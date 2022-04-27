import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Dropdown, NavItem } from "react-bootstrap";
import "./navbar.css";

const navbar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      bg="black"
      className="main-navbar p-0 bg-light"
    >
      <Navbar.Toggle
        className="burger text-center bg-dark"
        aria-controls="responsive-navbar-nav"
      />
      <Navbar.Collapse
        className=" justify-content-end "
        id="responsive-navbar-nav"
      >
        <Nav className="nav pl-3">
          <Nav.Link
            className="text-light text-center "
            as={Link}
            to={"/student"}
          >
            Student
          </Nav.Link>
          <Nav.Link className="text-light text-center" as={Link} to={"/staff"}>
            Staff
          </Nav.Link>

          <NavDropdown
            className="text-light text-center"
            title="Admissions"
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item
              as={Link}
              to={"/Parents"}
              className="text-white dropdown-btn"
            >
              {" "}
              PROSPECTIVE PARENTS{" "}
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to={"/AdmissionsInfo"}
              className="text-white dropdown-btn"
              style={{ background: "black" }}
            >
              ADMISSIONS INFO
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link
            className="text-light text-center"
            as={Link}
            to={"/pricing"}
          >
            Pricing
          </Nav.Link>
          <Nav.Link className="text-light text-center" as={Link} to={"/about"}>
            About
          </Nav.Link>
          <Nav.Link
            className="text-light text-center"
            as={Link}
            to={"/contact"}
          >
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default navbar;
