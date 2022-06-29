import React, { useState } from "react";
import { NavItem, Offcanvas } from "react-bootstrap";
import "./sidebar.css";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";

import { SiderbarData } from "./sidebarData";
import { NavLink as Link, useNavigate } from "react-router-dom";
import Logo from "../NavBar/logo.png";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/auth";

function Sidebar() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(LOGOUT());
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleShow} className="open-btnn">
        <BiIcons.BiMenuAltLeft className="open-btn" />
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header>
          <button className="slider-close-ptn" onClick={handleClose}>
            <AiIcons.AiFillCloseCircle />
          </button>
        </Offcanvas.Header>
        <div>
          <ul className="dashbord-nav-menu-items p-0">
            <li className="dashbord-Logo">
              <img src={Logo} alt="Logo" className="dashbord-logo-photo" />
            </li>
            {SiderbarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link
                    onClick={handleClose}
                    to={item.path}
                    style={({ isActive }) =>
                      isActive ? { color: "black" } : undefined
                    }
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="d-flex mt-4 justify-content-center dashbord-nav-text">
              <Link to="#" onClick={logoutHandler}>
                <FiLogOut />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </Offcanvas>
    </div>
  );
}

export default Sidebar;
