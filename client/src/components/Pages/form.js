import React from "react";
import "./form.css";
import ph from "../../images/form.png";
import { Container, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHttpClient } from "../../hooks/http-hook";

const FormPage = () => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const { sendRequest } = useHttpClient();
  const formik = useFormik({
    initialValues: {
      studentOrParent: "student",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      dateOfBirth: "",
      studentLevel: "",
      submitQuestion: "None",
    },
    validationSchema: yup.object({
      studentOrParent: yup.string().required(),
      firstName: yup.string().required("Enter your First Name").min(3).max(20),
      lastName: yup.string().required("Enter your Last Name").min(3).max(20),
      email: yup.string().required("Enter your Email").email("Invalid Email"),
      phone: yup
        .string()
        .required("Enter your phone")
        .matches(phoneRegExp, "Phone number is not valid")
        .max(11),
      country: yup.string().required("Enter your Country").min(3).max(20),
      city: yup.string().required("Enter your City").min(3).max(20),
      dateOfBirth: yup.string().required("Enter your Date of Birth"),
      studentLevel: yup.number().min(1).max(12),
      submitQuestion: yup.string().required("Enter your question").max(500),
    }),
    onSubmit: async (values) => {
      const data = await sendRequest({
        method: "POST",
        body: values,
        url: "/student/register",
      });
      console.log(data);
    },
  });

  return (
    <div>
      <img src={ph} alt="ph" className="form-photo w-100" />
      <div className="form-header w-100">
        <h1 className="font-weight-bold">SIGN UP </h1>
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

        <Form
          onSubmit={formik.handleSubmit}
          className="signup-form w-100 mt-5 col-10 col-lg-5 mx-auto"
        >
          <Row>
            <Form.Group className="mb-4 col-12">
              <Form.Label className="font-weight-bold">
                Are you a student or a parent?
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="studentOrParent"
                onChange={formik.handleChange}
                value={formik.values.studentOrParent}
              >
                <option value="student">Student</option>
                <option value="parent">Parent</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4 col-12" controlId="formGridName">
              <Form.Label className="font-weight-bold">First Name</Form.Label>
              <Form.Control
                placeholder="Enter Your First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="position-absolute text-danger">
                  {formik.errors.firstName}
                </div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-4 col-12" controlId="formGridName">
              <Form.Label className="font-weight-bold">Last Name</Form.Label>
              <Form.Control
                placeholder="Enter Your Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="position-absolute text-danger">
                  {formik.errors.lastName}
                </div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-4 col-12" controlId="formGridEmail">
              <Form.Label className="font-weight-bold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="position-absolute text-danger">
                  {formik.errors.email}
                </div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-4 col-12" controlId="formGridNumber">
              <Form.Label className="font-weight-bold">
                What Is Your Phone Number ?
              </Form.Label>
              <Form.Control
                placeholder="01023456645"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="position-absolute text-danger">
                  {formik.errors.phone}
                </div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-4 col-12">
              <Form.Label className="font-weight-bold">
                What Country do You Live In ?
              </Form.Label>
              <Form.Control
                placeholder="Enter The Country You Live In"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
              />
              {formik.touched.country && formik.errors.country ? (
                <div className="position-absolute text-danger">
                  {formik.errors.country}
                </div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-4 col-12">
              <Form.Label className="font-weight-bold">City</Form.Label>
              <Form.Control
                placeholder="Enter The City You Live In"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="position-absolute text-danger">
                  {formik.errors.city}
                </div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-4 col-12">
              <Form.Label className="font-weight-bold">
                Student's Date of Birth
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter The City You Live In"
                name="dateOfBirth"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                <div className="position-absolute text-danger">
                  {formik.errors.dateOfBirth}
                </div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-4 col-12">
              <Form.Label className="font-weight-bold">
                Student's Current Grade/Year Level
              </Form.Label>
              <Form.Control
                placeholder="Choose one"
                name="studentLevel"
                value={formik.values.studentLevel}
                onChange={formik.handleChange}
              />
              {formik.touched.studentLevel && formik.errors.studentLevel ? (
                <div className="position-absolute text-danger">
                  {formik.errors.studentLevel}
                </div>
              ) : null}
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
                name="submitQuestion"
                value={formik.values.submitQuestion}
                onChange={formik.handleChange}
              />
              {formik.touched.submitQuestion && formik.errors.submitQuestion ? (
                <div className="position-absolute text-danger">
                  {formik.errors.submitQuestion}
                </div>
              ) : null}
            </Form.Group>
            <input
              className="form-but col-4 col-md-3  col-xl-2"
              type="submit"
              value="SUBMIT"
            />
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default FormPage;
