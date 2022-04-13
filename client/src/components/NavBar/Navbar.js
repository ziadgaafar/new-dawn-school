import React from 'react';
import {  Link } from "react-router-dom";
import {  Navbar,Nav ,NavDropdown  } from 'react-bootstrap';
import './navbar.css'

const navbar= () =>{
  return (

    <Navbar collapseOnSelect expand="lg"  variant="dark" bg = "black" className='main-navbar  m-0 ' >

 
 
          
          <Navbar.Toggle className="burger text-center " aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className=" justify-content-end "   id="responsive-navbar-nav">
          
            <Nav className=''>
              <Nav.Link className="text-light text-center " as={Link} to={"/student"}>Student</Nav.Link>
              <Nav.Link className="text-light text-center" as={Link} to={"/staff"}>Staff</Nav.Link>

              <NavDropdown className="text-light text-center" title="Admissions" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to={"/Parents"} > PROSPECTIVE PARENTS </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/AdmissionsInfo"}> ADMISSIONS INFO</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link className="text-light text-center" as={Link} to={"/pricing"}>Pricing</Nav.Link>
              <Nav.Link className="text-light text-center" as={Link} to={"/about"}>About</Nav.Link>
              <Nav.Link className="text-light text-center" as={Link} to={"/contact"}>Contact</Nav.Link>
            </Nav>

          
            
          </Navbar.Collapse>
   
     
    
    </Navbar>

  );
}
export default navbar;