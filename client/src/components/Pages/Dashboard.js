import React, { useState, useLayoutEffect, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Route, Routes, Navigate } from "react-router-dom";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { AiFillStar } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";

import Sidebar from "../Dashboard/sidebar";
import Student from "../Dashboard/student";
import Courses from "../Dashboard/courses/courses";
import AllCourses from "../Dashboard/courses/all";
import Course from "../Dashboard/courses/course";
import Chats from "../Dashboard/chats";
import Settings from "../Dashboard/settings";
import Schedule from "../Dashboard/schedule";
import Grades from "../Dashboard/grades";

// import Stream from "../Dashboard/courses/stream";

import person from "../../images/person.png";
import { LOGIN } from "../../redux/auth";
import { useHttpClient } from "../../hooks/http-hook";

import "react-calendar/dist/Calendar.css";

const exams = [
  { name: "English Exam", date: new Date() },
  { name: "Science Exam", date: new Date() },
  { name: "Mathematics Exam", date: new Date() },
];

const Dashboard = ({}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { sendRequest } = useHttpClient();

  const [dateValue, setDateValue] = useState(new Date());
  const { token, user } = useSelector((state) => state.auth);

  const localToken = localStorage.getItem("token");
  const localUser = JSON.parse(localStorage.getItem("user"));

  useLayoutEffect(() => {
    if (localToken) {
      (async () => {
        const data = await sendRequest({
          url: "/images",
          headers: {
            Authorization: `Bearer ${localToken}`,
          },
        });
        dispatch(
          LOGIN({
            token: localToken,
            user: {
              ...localUser,
              image: data
                ? `${process.env.REACT_APP_SERVER_URL}/${data.path}`
                : null,
            },
          })
        );
      })();
    }
  }, []);

  if (!token && !localToken) return <Navigate to="/login" />;

  return (
    <>
      {token && (
        <div style={{ backgroundColor: "#F6F6F6", minHeight: "100vh" }}>
          <Sidebar />
          <img
            src={user.image || person}
            alt="Person"
            className="position-absolute m-3 top-0 rounded-circle"
            style={{ width: 65, height: 65, right: 0, cursor: "pointer" }}
            onClick={handleShow}
          />

          <Routes>
            <Route path="/" exact element={<Student />} />
            <Route path="/courses/all" element={<AllCourses />} />
            <Route path="/courses/:id" element={<Course />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/chats" element={<Chats user={user} />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/grades" element={<Grades />} />
            {/* <Route path="/stream" element={<Stream />} /> */}
          </Routes>

          <Modal show={show} onHide={handleClose}>
            <MdClose
              onClick={handleClose}
              style={{ cursor: "pointer" }}
              size="35"
              className="ml-auto m-1"
            />
            <Modal.Header>
              <div className="w-100 d-flex flex-column align-items-center">
                <img
                  className="rounded-circle"
                  src={user.image || person}
                  alt={user.firstName || user.firstname}
                  style={{ width: 150, height: 150 }}
                />
                <h2 className="fw-bolder">
                  {user.firstName || user.firstname}{" "}
                  {user.lastName || user.lastname}
                </h2>
                <div className="d-flex align-items-center justify-content-between">
                  <AiFillStar
                    style={{ marginTop: -5 }}
                    className="mx-2"
                    size="25"
                  />
                  <h4>Grade {user.studentLevel}</h4>
                </div>
              </div>
            </Modal.Header>
            <Modal.Body>
              <Calendar
                className="w-100 my-3 border rounded mx-auto"
                value={dateValue}
                onChange={setDateValue}
              />
              <div className="d-flex flex-column align-items-center">
                <div className="w-100 d-flex justify-content-between">
                  <p className="fw-bolder lead">Reminder</p>
                  <p className="fw-bolder lead" style={{ cursor: "pointer" }}>
                    View All <BsArrowRight size="20" />
                  </p>
                </div>
                <div className="text-center">
                  <h1 className="fw-bold">Upcoming</h1>
                  <h1
                    className="display-2 fw-bold my-3"
                    style={{ color: "#3B9BE3", fontFamily: "Tahoma" }}
                  >
                    {exams.length}
                  </h1>
                  <h1 className="fw-bold">Exams</h1>
                </div>
                <div className="w-100 d-flex flex-column">
                  {exams.map((exam) => (
                    <div
                      key={exam.name}
                      className={`mt-2 d-flex justify-content-between`}
                    >
                      <div className="fw-bolder">{exam.name}</div>
                      <div className="border bg-light h-25 w-50 my-auto"></div>
                      <div style={{ color: "#3B9BE3" }} className="fw-bolder">
                        {exam.date.toString().split(" ")[1]}{" "}
                        {exam.date.toString().split(" ")[2]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Dashboard;
