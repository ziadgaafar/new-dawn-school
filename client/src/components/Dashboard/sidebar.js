import React, { useState } from 'react'
import { Link } from 'react-router-dom';


import * as FaIcons from 'react-icons/fa';
import Logo from "../NavBar/logo.png";

import { SiderbarData } from './sidebarData'
import './sidebar.css';
import { Container } from 'react-bootstrap';



function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (

    <Container className="dashbord-container">

      <div style={{ width: isOpen ? "250px" : "50px " }}>
        <nav className={isOpen ? 'dashbord-nav-menu active' : 'dashbord-nav-menu'} >

          <ul className='dashbord-nav-menu-items' >
            <li style={{ marginLeft: isOpen ? "-30px" : "0px" }} className='dashbord-navbar-toggle' onClick={toggle}>
              <Link to='#' className='menu-bars'>
                <FaIcons.FaBars />
              </Link>
            </li>
            <li style={{ marginLeft: isOpen ? "-20px" : "0px" }} className='dashbord-Logo'>
              <img style={{ width: isOpen ? "100px" : "150px ", height: isOpen ? "100px" : "150px " }} src={Logo} alt="Logo" className="dashbord-logo-photo" />
            </li>
            {SiderbarData.map((item, index) => {
              return (

                <li key={index} className={item.cName}>
                  <Link to={item.path} style={{ marginLeft: isOpen ? "-20px" : "0px" }} >
                    {item.icon}
                    <span style={{ display: isOpen ? "none" : "block" }}>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

        </nav>
      </div>
      <main>{children}</main>
    </Container>



  );
}

export default Sidebar




