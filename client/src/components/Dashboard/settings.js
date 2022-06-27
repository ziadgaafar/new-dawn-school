import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import person from "../../images/person.png";
import { MDBSwitch } from "mdb-react-ui-kit";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Container className="settings-page w-100">
      <h1 className="fw-bold pt-5 text-center text-md-left">Settings</h1>
      <Row className="w-100">
        <Col lg={8} sm={6} className="">
          <h5 className="fw-bold pt-4 m-4 ">Profile</h5>
          <h5 className="fw-bold  ml-4">Change Your Account Picture</h5>
          <p className="  ml-4 text-muted">
            Signed In As Mohammed.Ahmed@Gmail.Com
          </p>
        </Col>
        <Col lg={3} sm={4} className="p-5  ">
          <img style={{ width: 100, height: 100 }} src={person} alt="Person" />
        </Col>
      </Row>
      <hr />
      <h5 className="fw-bold pt-5 ml-4 ">Your Account</h5>
      <h5 className="fw-bold pt-4 ml-4 ">Change Your Account Password</h5>
      <Row>
        <Col lg={2} xs={7}>
          <h6 className="pt-4 ml-5">Notifications</h6>
        </Col>
        <Col lg={4} xs={3} className="pt-4">
          <MDBSwitch
            id="flexSwitchCheckDefault"
            onClick={toggle}
            label={isOpen ? "Off" : "On"}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
