import React, { useState } from 'react'
import { Offcanvas } from "react-bootstrap";
import './sidebar.css';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai';

import { SiderbarData } from './sidebarData';
import { Link } from 'react-router-dom';
import Logo from "../NavBar/logo.png";

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggle = () => setShow(!show);

  return (
    <div >
      <button  onClick={handleShow} className="open-btnn">
        <BiIcons.BiMenuAltLeft className='open-btn'/>
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header>
          <button className="slider-close-ptn" onClick={toggle} >
           <AiIcons.AiFillCloseCircle />
          </button>
        </Offcanvas.Header>
        <div >
          <ul className='dashbord-nav-menu-items' onClick={toggle} >
            <li className='dashbord-Logo'>
              <img  src={Logo} alt="Logo" className="dashbord-logo-photo" />
            </li>
            {SiderbarData.map((item, index) => {
              return (

                <li key={index} className={item.cName}>
                  <Link to={item.path}  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
      </div>
      </Offcanvas>
    </div>
  );
}

export default Sidebar ;




