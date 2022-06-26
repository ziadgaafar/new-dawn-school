import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./courses.css";
import * as BsIcons from "react-icons/bs";

const courses = () => {
  return (
    <div className="pl-4 row w-100 justify-content-center">
      <h1 className="fw-bold pt-4 pl-5">Courses</h1>
      <Row className="mt-5">
        <Col lg={6} xs={11} className="m-4">
          <div className="english row w-100 float-right">
            <Col className="p-4">
              <h1 className="fw-bold">English</h1>
              <p>24 Lessons</p>
            </Col>
            <Col className="p-4">
              <p className="float-right">100 Mins</p>
            </Col>{" "}
            <br></br>
            <div
              className="youtube"
              onClick={() => window.open("https://youtube.com", "_blank")}
              href=""
            >
              <BsIcons.BsYoutube />
            </div>
          </div>
        </Col>

        <Col lg={4} xs={10} className="m-4">
          <div className="notes float-right">
            <h1 className="fw-bold p-3">Notes</h1>
            <ul>
              <li className=" p-1">
                You Have 3 Exams This Month In ( English- Science - Mathematics
                )
              </li>
              <li className=" p-1">Try To Equal The Effort With All Courses</li>
              <li className=" p-1">Do Not Forget To Do Your Home Work</li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={4} xs={10} className="m-5 float-right">
          <div className="mathematics row w-100 float-right">
            <Col className="p-4">
              <h1 className="math-head fw-bold">Mathematics</h1>
              <p>15 Lessons</p>
            </Col>
            <Col className="p-4">
              <p className="float-right">100 Mins</p>
            </Col>{" "}
            <br></br>
            <div
              className="youtube"
              onClick={() => window.open("https://youtube.com", "_blank")}
              href=""
            >
              <BsIcons.BsYoutube />
            </div>
          </div>
        </Col>

        <Col lg={4} xs={10} className="m-5 float-right">
          <div className="science row w-100 float-right">
            <Col className="p-4">
              <h1 className="science-head fw-bold">Science</h1>
              <p>10 Lessons</p>
            </Col>
            <Col className="p-4">
              <p className="float-right">100 Mins</p>
            </Col>{" "}
            <br></br>
            <div
              className="youtube"
              onClick={() => window.open("https://youtube.com", "_blank")}
              href=""
            >
              <BsIcons.BsYoutube />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default courses;
