import React from "react";
import { Container, InputGroup, Form, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import girl from "../../images/girl.png";
import "./student.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import Chart from "react-apexcharts";

const Student = () => {
  const { user } = useSelector((state) => state.auth);

  const areaChartData = {
    chart: { id: "basic-bar" },
    xaxis: {
      categories: ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"],
    },
    series: [
      {
        name: "series-1",
        data: [10, 40, 25, 70, 60, 40, 0],
      },
    ],
  };

  const options = {
    labels: ["English", "Scinece", "Math", "Arabic"],
    series: [50, 25, 15, 10],
  };
  const subjectsDegree = [
    {
      subject: "English",
      color: "rgb(10, 116, 253)",
      degree: "50%",
    },
    {
      subject: "Scinece",
      color: "rgb(64, 233, 64)",
      degree: "25%",
    },
    {
      subject: "Math",
      color: "rgba(255, 217, 0, 0.884)",
      degree: "15%",
    },
    {
      subject: "Arabic",
      color: "rgb(247, 60, 60)",
      degree: "10%",
    },
  ];

  const coursesAttend = [
    {
      subject: "English",
      background: "blue",
      color: "rgb(10, 116, 253)",
      degree: "80",
      time: "4h 30min",
    },
    {
      subject: "Arabic",
      background: "orange",
      color: "warning",
      degree: "50",
      time: "45min",
    },
    {
      subject: "Scinece",
      background: "rgb(24, 184, 24)",
      color: "success",
      degree: "35",
      time: "3h 30min",
    },
    {
      subject: "Social Studies",
      background: "gray",
      color: "gray",
      degree: "0",
      time: "00",
    },
    {
      subject: "Math",
      background: "red",
      color: "danger",
      degree: "15",
      time: "1h 35min",
    },
  ];

  return (
    <Container className=" w-100">
      <Row className="w-100">
        <Col lg={8}>
          <h1 className="fw-bold text-center text-md-left">Dashboard</h1>
        </Col>
        <Col lg={4}>
          <InputGroup>
            <Form.Control className="searsh-box " placeholder="search class" />
          </InputGroup>
        </Col>
      </Row>
      {/* ---------------------------------------------------        */}
      <Row className="welcome-div justify-content-center ml-1 mt-5 w-100">
        <Col xs={10} md={7}>
          <div className="float-left">
            <h1
              className="student-header fw-bold fs-2 "
              style={{ color: "#0040A1" }}
            >
              Welcome Back, {user.firstName || user.firstname} !
            </h1>
            <p className="student-p">
              You Have Learned<span className="fw-bold">70%</span> Of Your Goal
              This Week! <br></br> Keep It Up And Improve Your Progress!
            </p>
          </div>
        </Col>
        <Col xs={2} md={5}>
          <img src={girl} className=" float-right" />
        </Col>
      </Row>
      {/* ---------------------------------------------------        */}
      <Row className="justify-content-center ml-1 mt-5 w-100">
        <Col lg={6} xs={12} className="student-infos mt-5 bg-white m-2">
          <Row className="student-infos p-4">
            <Col xs={12} md={6}>
              <h3 style={{ color: "#0040A1" }}>Your Activity</h3>
              <p>10 Sep 2022 - 17 Sep 2022</p>
            </Col>
            <Col xs={12} md={6} className="float-right">
              <button className="week-but float-right">
                Last Week <i className="arrow down"></i>
              </button>
            </Col>
          </Row>
          <Row className="w-100">
            <Chart
              options={areaChartData}
              series={areaChartData.series}
              type="line"
              width="100%"
            />
          </Row>
        </Col>
        <Col lg={5} xs={12} className=" mt-5 m-2">
          <div className="student-infos bg-white p-4">
            <Row>
              <h3 style={{ color: "#0040A1" }} className=" ">
                {" "}
                Time Spent{" "}
              </h3>
            </Row>
            <Row className="w-100 m-1 mt-3 mb-3">
              <Chart
                options={options}
                labels={options.labels}
                series={options.series}
                type="donut"
              />
            </Row>
            <Row className="justify-content-center ">
              {subjectsDegree.map((item, index) => {
                return (
                  <ul className="row" key={index}>
                    <Col>
                      <div
                        className="square"
                        style={{ backgroundColor: item.color }}
                      ></div>{" "}
                      {item.subject}
                    </Col>
                    <Col className="fw-bold">{item.degree}</Col>
                  </ul>
                );
              })}
            </Row>
          </div>
        </Col>
      </Row>
      {/* ---------------------------------------------------        */}
      <div className="student-infos ml-1 p-5 mt-5 bg-white w-100 ">
        <Row className="ml-1">
          <Col xs={12} md={6}>
            <h3 style={{ color: "#0040A1" }} className=" ">
              Progress
            </h3>
          </Col>
          <Col xs={12} md={6} className="float-right">
            <button className="week-but float-right">
              Last Week <i className="arrow down"></i>
            </button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Row className="courses-attend p-4">
            <Col xs={12} md={1}>
              <h4 className="  text-black fw-bold">courses </h4>
            </Col>

            <Col xs={12} md={6}>
              <p className="text-muted fw-bolder pt-2 float-right">This week</p>
            </Col>

            {coursesAttend.map((item, index) => {
              return (
                <Col
                  lg={5}
                  key={index}
                  className="courses-attend m-2 rounded p-3  "
                >
                  <Row>
                    <Col xs={2} lg={1}>
                      <div
                        className="circle"
                        style={{ backgroundColor: item.background }}
                      ></div>
                    </Col>
                    <Col xs={7}>
                      <h3 className="ml-3">{item.subject}</h3>
                    </Col>
                    <Col xs={12} md={1}>
                      {" "}
                      <p className="text-muted float-right">{item.time}</p>
                    </Col>
                  </Row>
                  <ProgressBar now={item.degree} variant={item.color} />
                </Col>
              );
            })}
          </Row>
        </Row>
      </div>{" "}
      <br></br>
      <br></br>
    </Container>
  );
};

export default Student;
