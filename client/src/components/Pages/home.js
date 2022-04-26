import React from "react";
import "./home.css";
import ph1 from "../../images/home.jpg";
import ph2 from "../../images/info-card1.jpg";
import ph3 from "../../images/info-card2.jpg";


import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { FaUserGraduate } from "react-icons/fa";
import { MdLaptopMac } from "react-icons/md";
import { FaStarOfLife } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      {/*main image */}
      <img src={ph1} alt="ph1" className="home-photo d-flex w-100 " />
      {/*home header and button */}
      <div>
        <h1 className="home-header ">
          No More Crowded Classes No More Heavy Bags
        </h1>
       <Link  as={Link} to={"/Apply"}> <button className="home-button " >APPLY</button> </Link> 
      </div>
      {/*welcome container */}
      <div className="container ">
        <div className="welc-container col-7  justify-content-center">
          <span>Welcome To </span> <br></br>
          <span>The New Dawn School For Online Education</span>
          <hr className="line"></hr>
        </div>
        <p className="home-par">
          The Mission of The New Dawn School for Children is to empower our
          children to achieve their greatest potential both as students and as
          members of their communities.
        </p>
      </div>
      {/*cardes*/}

      <div className="cards row w-100 justify-content-center">
        <div className="all-cards  card-1  ">
          <div className="card-content">
            <h1 className="card-h">ELEMENTARY</h1>
            <p className="card-p">
              grades k-5 young minds are like newly formed galaxies full of
              energy, expansive & curious. poised & ready to stretch out and
              make their mark in the universe. at new dawn we believe that every
              child is full of brilliance and potential. at new dawn elementary
              they discover it for themselves.
            </p>
            <hr className="card-line"></hr>
          </div>
        </div>

        <div className=" all-cards card-2  ">
          <div className="card-content">
            <h1 className="card-h ">MIDDLE SCHOOL</h1>
            <p className="card-p">
              Grades 6-8 Here at new dawn Academy we envision every student
              becoming a world -class scientist, technologist, engineer or
              mathematician. We encourage students to become critical thinkers &
              to explore and experiment with their talents & discover their
              purpose.
            </p>
            <hr className="card-line"></hr>
          </div>
        </div>

        <div className="all-cards card-3 ">
          <div className="card-content">
            <h1 className="card-h ">HIGH SCHOOL</h1>
            <p className="card-p">
              Grades 9-12 Here at new dawn Academy we envision every student
              becoming a world -class scientist, technologist, engineer or
              mathematician. We encourage students to become critical thinkers &
              to explore and experiment with their talents & discover their
              purpose.
            </p>
            <hr className="card-line"></hr>
          </div>
        </div>
      </div>

      {/*info about us*/}

      <Container>
        <Row className="info  justify-content-center">
          <Col lg="6" md="9" sm="12">
            <h1 className="info-header">WHY CHOOSE NEW DAWN</h1>
          </Col>
        </Row>
      </Container>
      <Row className="justify-content-center w-100">
        <Col lg="2" xs="8" className="icon-card">
          <GiEarthAfricaEurope className="icons" /> <br></br>
          <p className="icons-info">Top-Quality International Education</p>
        </Col>
        <Col lg="2" xs="8" className="icon-card">
          <FaUserGraduate className="icons" /> <br></br>
          <p className="icons-info">Safe & Nurturing Environment</p>
        </Col>
        <Col lg="2" xs="8" className="icon-card">
          <MdLaptopMac className="icons" /> <br></br>
          <p className="icons-info">Cutting-Edge Educational Technology</p>
        </Col>
        <Col lg="2" xs="8" className="icon-card">
          <FaStarOfLife className="icons" /> <br></br>
          <p className="icons-info">Enriching Student Life</p>
        </Col>
      </Row>

      {/*info about us*/}

      <Container className="about-container">
        <Row className=" w-100 justify-content-center">
          <Col lg="10">
            <h1 className="about-us">
              Make Change.<br></br>
              To The Way You Think. To The Path You Take.<br></br>
              To The Lives Of People All Over The World.
            </h1>
          </Col>
        </Row>
      </Container>

      <div className="info-cards  ">
        <div class=" card-info-content ">
          <h1 className="font-weight-bold   ">What Is School Of New Dawn</h1>
          <br></br>
          <br></br>
          <p className="font-weight-normal ">
            We are a network of professionals with passion towards learning,
            equipped with our philosophy in learning as a whole through
            delivering education, building character and equipping tomorrow's
            leaders with the required skills to create a better world through
            contributing to creating a healthier student with a stable
            personality...
          </p>
        </div>

        <div className="">
          <img src={ph2} alt="ph1" className="info-img  " />
        </div>
      </div>

      <div className="info-cards ">
        <div class="card-info-content card-info-content2  ">
          <h1 className="font-weight-bold ">
            The COVID-19 pandemic has changed education forever. This is how
          </h1>
          <br></br>

          <p className="font-weight-normal ">
            In response to significant demand, many online learning platforms
            are offering free access to their services, including platforms like
            BYJU’S, a Bangalore-based educational technology and online tutoring
            firm founded in 2011, which is now the world’s most highly valued
            tech company. Since announcing free live classes on its Think and
            Learn app, BYJU’s has seen a 200% increase in the number of new
            students using itsproduct, according to Mrinal Mohit, the company's
            Chief Operating Officer.
          </p>

          <button className="read-more">Read More</button>
        </div>

        <div>
          <img src={ph3} alt="ph1" className="info-img " />
        </div>
      </div>
    </div>
  );
};

export default Home;
