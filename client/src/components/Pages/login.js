import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../NavBar/logo.png";
import bgImage from "../../images/university-back.png";
import person from "../../images/person.png";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHttpClient } from "../../hooks/http-hook";

const Login = () => {
  const { sendRequest } = useHttpClient();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid Email Address"),
      password: yup.string().required().min(8),
    }),
    onSubmit: async (values) => {
      const data = await sendRequest({
        method: "POST",
        body: values,
        url: "/login",
      });
      console.log(data);
    },
  });

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container fluid className="bg-white">
        <Row>
          <Col className="d-flex justify-content-center gap-2">
            <h1 className="display-5 d-flex align-items-center fw-bolder">
              Connecting to
            </h1>
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
      <Container fluid>
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

            <Form onSubmit={formik.handleSubmit}>
              <Container className="">
                <Form.Group className="mb-4" controlId="formGridEmail">
                  <Form.Label className="fw-bolder">Email Address</Form.Label>
                  <Form.Label className="">
                    Sign in with your New Dawn email address
                  </Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="position-absolute text-danger">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </Form.Group>

                <Form.Group className="" controlId="formGridPassword">
                  <Form.Label className="fw-bolder">Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="position-absolute text-danger">
                      {formik.errors.password}
                    </div>
                  ) : null}
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
    </div>
  );
};

export default Login;
