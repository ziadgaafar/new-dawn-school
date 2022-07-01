import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import person from "../../images/person.png";
import { MDBSwitch } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { useHttpClient } from "../../hooks/http-hook";
import { LOGIN } from "../../redux/auth";
import { useFormik } from "formik";
import * as yup from "yup";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [file, setFile] = useState(null);
  const { user, token } = useSelector((state) => state.auth);
  const changeImage = useHttpClient();
  const changePassword = useHttpClient();
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmedPassword: "",
    },
    validationSchema: yup.object({
      oldPassword: yup.string().required().min(8),
      newPassword: yup.string().required().min(8),
      confirmedPassword: yup.string().required().min(8),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = await changePassword.sendRequest({
        method: "PUT",
        url: `/${user.role}/changePassword`,
        body: values,
        headers: { Authorization: `Bearer ${token}` },
      });
      resetForm();
    },
  });

  const inputFile = useRef(null);

  useEffect(() => {
    if (file) {
      (async () => {
        let formData = new FormData();
        formData.append("file", file);
        setFile(null);
        const data = await changeImage.sendRequest({
          url: `/${user.role}/imageUpload`,
          method: "POST",
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(
          LOGIN({
            token,
            user: {
              ...user,
              image: `${process.env.REACT_APP_SERVER_URL}/${data.path}`,
            },
          })
        );
      })();
    }
  }, [file]);

  return (
    <Container className="settings-page">
      <h1 className="fw-bold text-center text-md-left">Settings</h1>
      <Row className="mt-4">
        <h5 className="fw-bold">Profile</h5>
        <p className="text-muted">Signed In As {user.email}</p>
        <div className="d-flex flex-column align-items-center align-items-md-start">
          <h5 className="fw-bold">Change Your Account Picture</h5>
          <div className="position-relative mt-2">
            <img
              className="rounded-circle"
              style={{ width: 100, height: 100 }}
              src={user.image || person}
              alt="Person"
            />
            <input
              style={{ display: "none" }}
              type="file"
              ref={inputFile}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <FiEdit
              onClick={() => inputFile.current.click()}
              role="button"
              size="25"
              className="position-absolute"
            />
          </div>
        </div>
      </Row>

      <hr className="my-4" />

      <Row>
        <h5 className="mt-2 fw-bold text-center text-md-left">
          Change Your Account Password
        </h5>
        <Col xs={12} md={6}>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="font-weight-bold">Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your old password"
                name="oldPassword"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
              />
              {formik.touched.oldPassword && formik.errors.oldPassword ? (
                <div className="position-absolute text-danger">
                  {formik.errors.oldPassword}
                </div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="font-weight-bold">New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your new password"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="position-absolute text-danger">
                  {formik.errors.newPassword}
                </div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="font-weight-bold">
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your new password"
                name="confirmedPassword"
                value={formik.values.confirmedPassword}
                onChange={formik.handleChange}
              />
              {formik.touched.confirmedPassword &&
              formik.errors.confirmedPassword ? (
                <div className="position-absolute text-danger">
                  {formik.errors.confirmedPassword}
                </div>
              ) : null}
            </Form.Group>
            <Button
              type="submit"
              className="w-100"
              disabled={changePassword.isLoading}
            >
              {changePassword.isLoading && (
                <Spinner size="sm" animation="border" />
              )}
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
