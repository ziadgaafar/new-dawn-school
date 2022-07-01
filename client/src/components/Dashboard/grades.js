import React, { useLayoutEffect, useReducer, useState } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHttpClient } from "../../hooks/http-hook";
import { AiFillEdit } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";

const Grades = ({}) => {
  const [data, setData] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const getDegrees = useHttpClient();
  const updateDegree = useHttpClient();
  const { token, user } = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      degreeAttend: selectedDegree?.degreeAttend,
      degreeAssign: selectedDegree?.degreeAssign,
      degreeExam: selectedDegree?.degreeExam,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      degreeAttend: yup
        .number("Incorrect")
        .required("Enter a degree")
        .min(0)
        .max(20, "Max degree is 20"),
      degreeAssign: yup
        .number("Incorrect")
        .required("Enter a degree")
        .min(0)
        .max(20, "Max degree is 20"),
      degreeExam: yup
        .number("Incorrect")
        .required("Enter a degree")
        .min(0)
        .max(60, "Max degree is 60"),
    }),
    onSubmit: async (values) => {
      let newDegree = { ...selectedDegree };
      newDegree.degreeAttend = +values.degreeAttend;
      newDegree.degreeAssign = +values.degreeAssign;
      newDegree.degreeExam = +values.degreeExam;
      newDegree.totalDegree =
        +values.degreeExam + +values.degreeAssign + +values.degreeAttend;
      const responseData = await updateDegree.sendRequest({
        method: "PUT",
        url: "/teacher/updateDegree",
        body: {
          ...values,
          courseId: selectedDegree.course._id,
          studentId: selectedDegree.student._id,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prev) => {
        const newData = prev.map((degree) =>
          degree._id === newDegree._id ? newDegree : degree
        );
        return newData;
      });
      setSelectedDegree(null);
    },
  });

  useLayoutEffect(() => {
    (async () => {
      if (token) {
        if (user.role === "student") {
          const data = await getDegrees.sendRequest({
            url: "/student/degree",
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(data);
        } else {
          const data = await getDegrees.sendRequest({
            url: "/teacher/getAllDegree",
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(data);
          // setData(data);
        }
      }
    })();
  }, [token]);

  return (
    <>
      <Modal size="md" centered show={selectedDegree}>
        <Modal.Header>
          <Modal.Title>Update Student's Course Degrees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-4 col-12" controlId="formGridName">
              <Form.Label className="font-weight-bold">Attendance</Form.Label>
              <Form.Control
                placeholder="Enter Degree"
                name="degreeAttend"
                value={formik.values.degreeAttend}
                onChange={formik.handleChange}
              />
              {formik.touched.degreeAttend && formik.errors.degreeAttend ? (
                <div className="position-absolute text-danger">
                  {formik.errors.degreeAttend}
                </div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-4 col-12" controlId="formGridName">
              <Form.Label className="font-weight-bold">Assignment</Form.Label>
              <Form.Control
                placeholder="Enter Degree"
                name="degreeAssign"
                value={formik.values.degreeAssign}
                onChange={formik.handleChange}
              />
              {formik.touched.degreeAssign && formik.errors.degreeAssign ? (
                <div className="position-absolute text-danger">
                  {formik.errors.degreeAssign}
                </div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-4 col-12" controlId="formGridName">
              <Form.Label className="font-weight-bold">Exam</Form.Label>
              <Form.Control
                placeholder="Enter Degree"
                name="degreeExam"
                value={formik.values.degreeExam}
                onChange={formik.handleChange}
              />
              {formik.touched.degreeExam && formik.errors.degreeExam ? (
                <div className="position-absolute text-danger">
                  {formik.errors.degreeExam}
                </div>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={formik.handleSubmit}>Update</Button>
          <Button variant="danger" onClick={() => setSelectedDegree(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <h1 className="fw-bold">Grades</h1>
      </Container>
      {data ? (
        <Container>
          <Table bordered hover size="sm">
            <thead>
              <tr className="">
                <th className="fw-bold">Subject</th>
                <th className="fw-bold">
                  {user.role === "student" ? "Teacher" : "Student"}
                </th>
                <th className="fw-bold">Attendance</th>
                <th className="fw-bold">Assignment</th>
                <th className="fw-bold">Exam</th>
                <th className="fw-bold">Total</th>
                {user.role === "teacher" && (
                  <th className="fw-bold text-center">Update</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td className="fw-bolder">
                    {item.course.subject.charAt(0).toUpperCase() +
                      item.course.subject.slice(1)}
                  </td>
                  {user.role === "student" ? (
                    <td className="fw-bolder">
                      {item.teacher.firstname + " " + item.teacher.lastname}
                    </td>
                  ) : (
                    <td className="fw-bolder">
                      {item.student.firstName + " " + item.student.lastName}
                    </td>
                  )}
                  <td className="fw-bolder">{item.degreeAttend}</td>
                  <td className="fw-bolder">{item.degreeAssign}</td>
                  <td className="fw-bolder">{item.degreeExam}</td>
                  <td className="fw-bolder">{item.totalDegree}</td>
                  {user.role === "teacher" && (
                    <td className="fw-bolder text-center">
                      <AiFillEdit
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedDegree(item)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      ) : (
        <div className="d-flex align-items-center justify-content-center p-5">
          {getDegrees.isLoading ? (
            <Spinner animation="border" />
          ) : (
            <h2>No Grades</h2>
          )}
        </div>
      )}
    </>
  );
};

export default Grades;
