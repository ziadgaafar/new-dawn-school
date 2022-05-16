import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../NavBar/logo.png";
import bgImage from "../../images/university-back.png";
import person from "../../images/person.png";

const Login = () => {
  return (
    <>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center gap-2">
            <h1 className="display-4 fw-bolder">Connecting to</h1>
            <img src={logo} alt="Logo" style={{ height: 80 }} />
          </Col>
          <p className="fw-bolder text-center">
            Sign-In With Your New Dawn University Account To Access
            Uniweb-Public
          </p>
        </Row>
      </Container>
      <Container fluid className="bg-black text-white py-2 pl-4">
        <Link to="/" className="text-white">
          Home
        </Link>{" "}
        {`>`} Sign in
      </Container>
      <Container
        fluid
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100%",
          height: "100%",
        }}
      >
        <Row className="d-flex justify-content-center py-4">
          <Col xs={10} sm={8} md={6} lg={4} xl={3} className="bg-white py-2">
            <div className="d-flex align-items-center justify-content-center gap-2">
              <h5 className="fw-bolder pt-2">New Dawn University</h5>
              <img src={logo} alt="Logo" style={{ height: 60 }} />
            </div>
            <div className="d-flex justify-content-center position-relative mt-4">
              <div
                className="position-absolute top-50 w-100"
                style={{ height: 3, background: "#414141", zIndex: 1 }}
              ></div>
              <img
                style={{ zIndex: 2, width: 80, height: 80 }}
                src={person}
                alt="Person"
              />
            </div>
            <h5 className="fw-bolder text-center mt-2 mr-1">Sign In</h5>

            <Form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("submit");
              }}
            >
              <Container className="">
                <Form.Group className="mb-4" controlId="formGridEmail">
                  <Form.Label className="fw-bolder">Email Address</Form.Label>
                  <Form.Label className="">
                    Sign in with your New Dawn email address
                  </Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="" controlId="formGridPassword">
                  <Form.Label className="fw-bolder">Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <button
                  type="submit"
                  className="mx-0 mt-5 mb-4 p-2 w-100 text-white"
                  style={{ background: "#2d4774" }}
                >
                  Sign In
                </button>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
