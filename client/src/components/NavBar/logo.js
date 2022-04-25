import React from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.png";
import { Navbar } from "react-bootstrap";
import "./navbar.css";

const logo = () => {
  return (
    <Navbar.Brand as={Link} to={"/"}>
      <div className="logo-div">
        <img src={Logo} alt="Logo" className="logo" />
        <div className="wrapper">
          <span className="logo-text text-black">New Dawn School</span>
        </div>
      </div>
    </Navbar.Brand>
  );
};
export default logo;
