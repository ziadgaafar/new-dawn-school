import React from "react";
import "./home.css";
import ph2 from "../../images/info-card1.jpg";
import ph3 from "../../images/info-card2.jpg";
import img1 from "../../images/home-img-1.png";
import img2 from "../../images/home-img-2.png";
import img3 from "../../images/home-img-3.png";
import lookingForHelp from "../../images/looking-for-help.png";

import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { FaUserGraduate } from "react-icons/fa";
import { MdLaptopMac } from "react-icons/md";
import { FaStarOfLife } from "react-icons/fa";

const Home = () => {
  return (
    <div className="home-container">
      {/*home main background image*/}
      <div className="home-bg-container">
        <div className="container">
          <div className="home-bg-content">
            <h1 className="home-header ">
              No More Crowded Classes No More Heavy Bags
            </h1>
            <Link as={Link} to={"/Apply"}>
              {" "}
              <button className="home-button ">APPLY</button>{" "}
            </Link>
          </div>
        </div>
      </div>
      {/*welcome container */}
      <div className="container">
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
      {/*cards*/}
      <div className="row justify-content-center">
        <div className="all-cards card-1 col-10 col-md-5 col-lg-3">
          <div className="card-content">
            <div className="card-info">
              <h1 className="card-h">ELEMENTARY</h1>
              <p className="card-p">
                grades k-5 young minds are like newly formed galaxies full of
                energy, expansive & curious. poised & ready to stretch out and
                make their mark in the universe. at new dawn we believe that
                every child is full of brilliance and potential. at new dawn
                elementary they discover it for themselves.
              </p>
              <hr className="card-line"></hr>
            </div>
          </div>
        </div>

        <div className="all-cards card-2 col-10 col-md-5 col-lg-3">
          <div className="card-content">
            <div className="card-info">
              <h1 className="card-h">MIDDLE SCHOOL</h1>
              <p className="card-p">
                Grades 6-8 Here at new dawn Academy we envision every student
                becoming a world -class scientist, technologist, engineer or
                mathematician. We encourage students to become critical thinkers
                & to explore and experiment with their talents & discover their
                purpose.
              </p>
              <hr className="card-line"></hr>
            </div>
          </div>
        </div>

        <div className="all-cards card-3 col-10 col-md-5 col-lg-3">
          <div className="card-content">
            <div className="card-info">
              <h1 className="card-h ">HIGH SCHOOL</h1>
              <p className="card-p">
                Grades 9-12 Here at new dawn Academy we envision every student
                becoming a world -class scientist, technologist, engineer or
                mathematician. We encourage students to become critical thinkers
                & to explore and experiment with their talents & discover their
                purpose.
              </p>
              <hr className="card-line"></hr>
            </div>
          </div>
        </div>
      </div>

      {/*info about us*/}
      <Container>
        <Row className="info justify-content-center">
          <Col lg="6" md="9" sm="12">
            <h1 className="info-header">WHY CHOOSE NEW DAWN</h1>
          </Col>
        </Row>
      </Container>
      <Row className="justify-content-center w-100 m-0">
        <Col lg="2" md="4" xs="8" className="icon-card">
          <div className="icon-card-content">
            <GiEarthAfricaEurope className="icons" /> <br></br>
            <p className="icons-info">Top-Quality International Education</p>
          </div>
        </Col>
        <Col lg="2" md="4" xs="8" className="icon-card">
          <div className="icon-card-content">
            <FaUserGraduate className="icons" /> <br></br>
            <p className="icons-info">Safe & Nurturing Environment</p>
          </div>
        </Col>
        <Col lg="2" md="4" xs="8" className="icon-card">
          <div className="icon-card-content">
            <MdLaptopMac className="icons" /> <br></br>
            <p className="icons-info">Cutting-Edge Educational Technology</p>
          </div>
        </Col>
        <Col lg="2" md="4" xs="8" className="icon-card">
          <div className="icon-card-content">
            <FaStarOfLife className="icons" /> <br></br>
            <p className="icons-info">Enriching Student Life</p>
          </div>
        </Col>
      </Row>

      {/*info about us*/}

      <Container className="about-container mt-4">
        <Row className="w-100 justify-content-center">
          <Col lg="10">
            <h1 className="about-us fw-bold">
              Make Change.<br></br>
              To The Way You Think. To The Path You Take.<br></br>
              To The Lives Of People All Over The World.
            </h1>
          </Col>
        </Row>
      </Container>

      <Container className="info-cards p-0 mt-5">
        <Row>
          <Col className="p-0" xs={12} md={6}>
            <img src={ph2} alt="ph2" className="info-img" />
          </Col>
          <Col className="m-auto p-4">
            <div className="card-info-content">
              <h1 className="font-weight-bold">What Is School Of New Dawn</h1>
              <p className="font-weight-normal">
                We are a network of professionals with passion towards learning,
                equipped with our philosophy in learning as a whole through
                delivering education, building character and equipping
                tomorrow's leaders with the required skills to create a better
                world through contributing to creating a healthier student with
                a stable personality...
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="info-cards p-0 mt-5">
        <Row>
          <Col xs={12} md={6} className="p-0">
            <img src={ph3} alt="ph3" className="info-img" />
          </Col>
          <Col className="m-auto p-4">
            <div className="">
              <h1 className="font-weight-bold ">
                The COVID-19 pandemic has changed education forever. This is how
              </h1>
              <p className="font-weight-normal ">
                In response to significant demand, many online learning
                platforms are offering free access to their services, including
                platforms like BYJU’S, a Bangalore-based educational technology
                and online tutoring firm founded in 2011, which is now the
                world’s most highly valued tech company. Since announcing free
                live classes on its Think and Learn app, BYJU’s has seen a 200%
                increase in the number of new students using itsproduct,
                according to Mrinal Mohit, the company's Chief Operating
                Officer.
              </p>

              <Link as={Link} to={"/Covid"}>
                {" "}
                <button className="read-more ">Read More</button>{" "}
              </Link>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="bg-light my-5">
        <Row fluid className="">
          {[
            { img: img1, text: "School Week", number: 11 },
            { img: img2, text: "Teachers", number: 42 },
            { img: img3, text: "Current Students", number: 750 },
          ].map((item) => (
            <Col
              key={item.number}
              xs={12}
              md={4}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <div className="d-flex flex-column align-items-center">
                <img src={item.img} alt={item.text} className="w-50 my-2" />
                <p className="fw-bolder">{item.text}</p>
              </div>
              <p className="fw-bold" style={{ letterSpacing: 6 }}>
                {item.number}
              </p>
            </Col>
          ))}
        </Row>
      </Container>

      <Container fluid className="bg-light my-5">
        <Row>
          <Col
            xs={12}
            md={8}
            className="text-center text-md-left mt-4 m-md-auto"
          >
            <h6 className="display-6">Looking for help?</h6>
            <p>
              Our Help Desk on this page can help. Select “I’m a CGA
              student/parent with a question” to get started. Our Help Desk can
              handle your frequently asked questions about life at CGA. If you
              can’t find what you’re looking for, you will be connected with one
              of our CGA Support Team members.
            </p>
          </Col>
          <Col xs={12} md={4}>
            <img
              src={lookingForHelp}
              alt="looking for help"
              className="w-100"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
