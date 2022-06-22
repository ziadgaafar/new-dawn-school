import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo.png";
import { Navbar } from "react-bootstrap";
import "./navbar.css";
import { useLocation } from "react-router-dom";

const LogoComponent = ({ dontShow }) => {
  const [show, setShow] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const pathname = location.pathname.split("/")[1];
    if (dontShow.includes(pathname)) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [location, dontShow]);
  return (
    show && (
      <Navbar.Brand as={Link} to={"/"}>
        <div className="logo-div">
          <img src={Logo} alt="Logo" className="logo" />
          <div className="wrapper">
            <span className="logo-text text-black">New Dawn School</span>
          </div>
        </div>
      </Navbar.Brand>
    )
  );
};
export default LogoComponent;
