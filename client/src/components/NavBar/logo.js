import React from 'react';
import {  Link } from "react-router-dom";
import Logo from "./logo.png"
import {  Navbar,  } from 'react-bootstrap';
import './navbar.css'

const logo = () =>{
  return (

        <div className=' logo-div'>
        <Navbar.Brand as={Link} to={"/"}> <img src={Logo} alt="Logo"  className='logo   ' /> <span className='logo-text text-black'>New Dawn School </span></Navbar.Brand>
        </div>
     
   
  );
}
export default logo;