import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHttpClient } from "../../../hooks/http-hook";
import { MdOutlineFileUpload, MdOutlineFileDownload } from "react-icons/md";
import { BiLinkExternal } from "react-icons/bi";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";

const AllCourses = ({}) => {
  const [file, setFile] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [data, setData] = useState(null);
  const { token, user } = useSelector((state) => state.auth);
  const getCourses = useHttpClient();
  const updateAssignment = useHttpClient();
  const updateExam = useHttpClient();
  const { sendRequest } = useHttpClient();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      assignmentText: selectedAssignment,
    },
    validationSchema: yup.object({
      assignmentText: yup.string().required().max(200),
    }),
    onSubmit: async (values) => {
      await updateAssignment.sendRequest({
        url: "/teacher/uploadassign",
        method: "POST",
        body: { assign: values.assignmentText, courseId: selectedCourse },
        headers: { Authorization: `Bearer ${token}` },
      });

      setData((prev) => {
        const newData = [...prev].map((course) => {
          if (course._id === selectedCourse) {
            return { ...course, assignment: values.assignmentText };
          } else {
            return course;
          }
        });
        return newData;
      });

      setSelectedAssignment("");
      setSelectedCourse("");
    },
  });

  const formikExam = useFormik({
    enableReinitialize: true,
    initialValues: {
      examLink: selectedExam,
    },
    validationSchema: yup.object({
      examLink: yup
        .string()
        .required("Please enter website")
        .url("Enter correct url!"),
    }),
    onSubmit: async (values) => {
      await updateExam.sendRequest({
        url: "/teacher/uploadExam",
        method: "POST",
        body: { exam: values.examLink, courseId: selectedCourse },
        headers: { Authorization: `Bearer ${token}` },
      });

      setData((prev) => {
        const newData = [...prev].map((course) => {
          if (course._id === selectedCourse) {
            return { ...course, exam: values.examLink };
          } else {
            return course;
          }
        });
        return newData;
      });

      setSelectedExam("");
      setSelectedCourse("");
    },
  });

  useLayoutEffect(() => {
    if (token) {
      (async () => {
        if (user.role === "student") {
          const data = await getCourses.sendRequest({
            url: "/student/course/all",
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(data.check);
        } else {
          const data = await getCourses.sendRequest({
            url: "/teacher/api/course/all",
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(data.check);
        }
      })();
    }
  }, [token]);

  const getBookHandler = async (courseId) => {
    const data = await sendRequest({
      url: `/${user.role}/getBook?courseId=${courseId}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    await sendRequest({
      url: `/${user.role}/downloadBook/${data._id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const uploadBookHandler = async (courseId) => {
    let formData = new FormData();
    formData.append("file", file);
    await sendRequest({
      method: "POST",
      url: `/teacher/uploadBook?courseId=${courseId}`,
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const uploadAssignmentHandler = async (courseId) => {
    let formData = new FormData();
    formData.append("file", assignment);
    await sendRequest({
      method: "post",
      url: `/student/uploadAssignment?courseId=${courseId}`,
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const updateAssignmentHandler = (assignmentText, courseId) => {
    setSelectedAssignment(assignmentText);
    setSelectedCourse(courseId);
  };

  const updateExamHandler = (examLink, courseId) => {
    setSelectedExam(examLink);
    setSelectedCourse(courseId);
  };

  return (
    <>
      <Container>
        <h1 className="fw-bold">Courses</h1>
      </Container>
      {data ? (
        <Container>
          <Table bordered hover size="sm">
            <thead>
              <tr className="">
                <th className="fw-bold text-center">Subject</th>

                <th className="fw-bold text-center">Book</th>
                <th className="fw-bold text-center">Assignment</th>
                <th className="fw-bold text-center">Exam</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td className="fw-bolder text-center">
                    {item.subject.charAt(0).toUpperCase() +
                      item.subject.slice(1)}
                  </td>

                  <td className="fw-bolder text-center">
                    <div className="d-flex justify-content-center">
                      {user.role === "teacher" ? (
                        <>
                          <MdOutlineFileUpload
                            size="25"
                            style={{ cursor: "pointer" }}
                            onClick={() => uploadBookHandler(item._id)}
                          />
                          <Form.Control
                            size="sm"
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </>
                      ) : (
                        <MdOutlineFileDownload
                          size="25"
                          style={{ cursor: "pointer" }}
                          onClick={() => getBookHandler(item._id)}
                        />
                      )}
                    </div>
                  </td>

                  <td className="d-flex flex-column align-items-center fw-bolder text-center">
                    {item.assignment ||
                      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, ipsam quidem? Cupiditate sapiente delectus placeat qui pariatur aperiam est voluptates!"}

                    <MdOutlineFileUpload
                      onClick={
                        user.role === "student"
                          ? () => uploadAssignmentHandler(item._id)
                          : () =>
                              updateAssignmentHandler(
                                item.assignment || "none",
                                item._id
                              )
                      }
                      style={{ cursor: "pointer" }}
                      className="my-1"
                      size="25"
                    />
                    {user.role === "student" && (
                      <Form.Control
                        size="sm"
                        type="file"
                        onChange={(e) => setAssignment(e.target.files[0])}
                      />
                    )}
                  </td>

                  <td className="fw-bolder text-center">
                    {user.role === "student" ? (
                      <>
                        {item.exam ? (
                          <BiLinkExternal
                            style={{ cursor: "pointer" }}
                            onClick={() => window.open(item.exam, "_blank")}
                            size="25"
                          />
                        ) : (
                          "No Exam"
                        )}
                      </>
                    ) : (
                      <MdOutlineFileUpload
                        size="25"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          updateExamHandler(item.exam || "none", item._id)
                        }
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      ) : (
        <>
          {getCourses.isLoading ? (
            <div className="d-flex justify-content-center p-5">
              <Spinner animation="border" />
            </div>
          ) : (
            <h1>No Data</h1>
          )}
        </>
      )}

      <Modal size="md" centered show={selectedAssignment}>
        <Modal.Header>
          <Modal.Title>Update Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-4 col-12" controlId="formGridName">
              <Form.Label className="font-weight-bold">Assignment</Form.Label>
              <Form.Control
                placeholder="Enter The Assignment Info"
                name="assignmentText"
                value={formik.values.assignmentText}
                onChange={formik.handleChange}
              />
              {formik.touched.assignmentText && formik.errors.assignmentText ? (
                <div className="position-absolute text-danger">
                  {formik.errors.assignmentText}
                </div>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={formik.handleSubmit}
            disabled={updateAssignment.isLoading}
          >
            {updateAssignment.isLoading && (
              <Spinner animation="border" size="sm" />
            )}
            Update
          </Button>
          <Button variant="danger" onClick={() => setSelectedAssignment("")}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="md" centered show={selectedExam}>
        <Modal.Header>
          <Modal.Title>Update Exam Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formikExam.handleSubmit}>
            <Form.Group className="mb-4 col-12" controlId="formGridName">
              <Form.Label className="font-weight-bold">Exam Link</Form.Label>
              <Form.Control
                placeholder="Enter The Exam Link"
                name="examLink"
                value={formikExam.values.examLink}
                onChange={formikExam.handleChange}
              />
              {formikExam.touched.examLink && formikExam.errors.examLink ? (
                <div className="position-absolute text-danger">
                  {formikExam.errors.examLink}
                </div>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={formikExam.handleSubmit}
            disabled={updateExam.isLoading}
          >
            {" "}
            {updateExam.isLoading && (
              <Spinner animation="border" size="sm" />
            )}{" "}
            Update
          </Button>
          <Button variant="danger" onClick={() => setSelectedExam("")}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllCourses;
