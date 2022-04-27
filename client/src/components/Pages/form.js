import React from "react";
import "./form.css";
import ph from "../../images/form.png";
import { Container, Form, Row } from "react-bootstrap";

const form = () => {
  return (
    <div>
      <img src={ph} alt="ph" className="form-photo w-100" />
      <div className="form-header w-100">
        <h1 className="font-weight-bold">SPEAK TO AN ADVISOR</h1>
        <p className="">
          New Dawn School delivers world-class online teaching to students right
          in their own home. <br></br>
          Speak to our advisor to understand the right path for you.
        </p>
      </div>
      <div className="form-body w-100">
        <p>
          If you're interested in discussing how a New Dawn Academy education
          could work for your family <br></br>
          please complete the form below and an Admissions Advisor will be in
          touch with you soon.
        </p>

        <Form className="signup-form w-100 mt-5 col-10 col-lg-5 mx-auto ">
          <Row>
            <Form.Group className="mb-4 col-12">
              <Form.Label className="font-weight-bold">
                Are you a student or a parent/guardian?
              </Form.Label>
              <Form.Control placeholder="Choose one" />
            </Form.Group>

            <Form.Group className="mb-4 col-12" controlId="formGridName">
              <Form.Label className="font-weight-bold">First Name</Form.Label>
              <Form.Control placeholder="Enter Your First Name" />
            </Form.Group>

            <Form.Group className="mb-4 col-12" controlId="formGridName">
              <Form.Label className="font-weight-bold">Last Name</Form.Label>
              <Form.Control placeholder="Enter Your Last Name" />
            </Form.Group>

            <Form.Group className="mb-4 col-12" controlId="formGridEmail">
              <Form.Label className="font-weight-bold">Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-4 col-12" controlId="formGridNumber">
              <Form.Label className="font-weight-bold">
                What Is Your Phone Number ?
              </Form.Label>
              <Form.Control type="number" placeholder="01023456" />
            </Form.Group>

            <Form.Group className="mb-4 col-12">
              <Form.Label className="font-weight-bold">
                What Country do You Live In ?{" "}
              </Form.Label>
              <Form.Control placeholder="Enter The Country You Live In" />
            </Form.Group>

            <Form.Group className="mb-4 col-12">
              <Form.Label className="font-weight-bold">City</Form.Label>
              <Form.Control placeholder="Enter The City You Live In" />
            </Form.Group>

            <Form.Group className="mb-4 col-12">
              <Form.Label className="font-weight-bold">
                Student's Date of Birth
              </Form.Label>
              <Container>
                <Row>
                  <Form.Control className="col-3  mx-1" placeholder="DD" />
                  <Form.Control className="col-3  mx-1" placeholder="MM" />
                  <Form.Control className="col-3 mx-1" placeholder="YYYY" />
                </Row>
              </Container>
            </Form.Group>

            <Form.Group className="mb-4 col-12">
              <Form.Label className="font-weight-bold">
                Student's Current Grade/Year Level
              </Form.Label>
              <Form.Control placeholder="Choose one" />
            </Form.Group>

            <Form.Group className="mb-4 col-12">
              <Form.Label className="font-weight-bold">
                Student's Current School
              </Form.Label>
              <Form.Control placeholder="Current school" />
            </Form.Group>

            <Form.Group className="mb-4 col-12">
              <Form.Label className="font-weight-bold">
                {" "}
                Please submit any questions/queries on your application here
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Please type here"
              />
            </Form.Group>
            <input
              className="form-but col-4 col-md-2 "
              type="submit"
              value="SUBMIT"
            />
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default form;
