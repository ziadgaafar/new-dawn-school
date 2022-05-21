import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const Pricing = () => {
  const color = "#E8E4F6";
  const colorDark = "#241348";
  const transition = "all 0.4s ease-in-out";
  const [annually, setAnnually] = useState(false);
  const [selected, setSelected] = useState(0);
  const plans = [
    {
      id: 1,
      name: "Basic",
      description: "Most popular",
      monthly: 10,
      annually: 80,
      features: [
        { name: "Student Data", value: true },
        { name: "Teacher Data", value: true },
        { name: "Weekly Plan", value: true },
        { name: "Assignments", value: true },
        { name: "Quizzes", value: false },
        { name: "School Library", value: false },
        { name: "Online Training", value: false },
        { name: "Full Financial Model", value: false },
      ],
    },
    {
      id: 2,
      name: "Professional",
      description: "Recommended",
      monthly: 15,
      annually: 115,
      features: [
        { name: "Student Data", value: true },
        { name: "Teacher Data", value: true },
        { name: "Weekly Plan", value: true },
        { name: "Assignments", value: true },
        { name: "Quizzes", value: true },
        { name: "School Library", value: true },
        { name: "Online Training", value: false },
        { name: "Full Financial Model", value: false },
      ],
    },
    {
      id: 3,
      name: "Ultimate",
      description: "Best value",
      monthly: 25,
      annually: 190,
      features: [
        { name: "Student Data", value: true },
        { name: "Teacher Data", value: true },
        { name: "Weekly Plan", value: true },
        { name: "Assignments", value: true },
        { name: "Quizzes", value: true },
        { name: "School Library", value: true },
        { name: "Online Training", value: true },
        { name: "Full Financial Model", value: true },
      ],
    },
  ];

  return (
    <div style={{ backgroundColor: "#F5FAFD" }}>
      <Container className="py-5">
        <div className="d-flex flex-column align-items-center">
          <h1 className="fw-bold">Our Pricing Plans</h1>
          <h5 className="fw-bold mb-0">Choose your plan.</h5>
          <span
            className="bg-dark my-4"
            style={{ height: 2, width: "20%" }}
          ></span>
          <div className="d-flex gap-3 align-items-center">
            <span className="fw-bolder">Monthly</span>
            <label className="switch mt-2">
              <input
                type="checkbox"
                checked={annually}
                onChange={() => setAnnually((prev) => !prev)}
              />
              <span className="slider round"></span>
            </label>
            <span className="fw-bolder">Annually</span>
            <span
              className="rounded-pill p-2"
              style={{ backgroundColor: color }}
            >
              %15 off
            </span>
          </div>
        </div>
      </Container>

      <Row className="mt-4 pb-5 w-100 mx-auto">
        {plans.map((plan) => (
          <Col
            key={plan.id}
            xs={12}
            md={6}
            lg={4}
            className={`rounded p-4 mx-auto mb-4 ${selected === plan.id && ""}`}
            style={{
              maxWidth: 380,
              transition: transition,
              transform:
                selected === plan.id ? "translateY(-20px)" : "translateY(0px)",
              backgroundColor: selected === plan.id ? colorDark : "white",
              color: selected === plan.id && color,
            }}
          >
            <div className="d-flex justify-content-between w-100">
              <div className="">
                <h2 className="mb-1 fw-bolder">{plan.name}</h2>
                <p
                  className={`m-0 ${
                    selected === plan.id ? "text-light" : "text-muted"
                  }`}
                >
                  {plan.description}
                </p>
              </div>
              <div
                className="rounded text-center  d-flex flex-column justify-content-center"
                style={{
                  color: selected == plan.id && colorDark,
                  backgroundColor: selected == plan.id ? color : color,
                  width: 90,
                }}
              >
                <p className="m-0 fw-bolder">
                  ${annually ? plan.annually : plan.monthly}
                </p>
                <p className="m-0 fw-bolder">
                  Per {annually ? "Year" : "Month"}
                </p>
              </div>
            </div>
            <div className="w-100 bg-light my-4" style={{ height: 1 }}></div>
            <div className="">
              {plan.features.map((feature) => (
                <div key={feature.name} className="d-flex gap-2">
                  <p
                    className="rounded text-center text-white bg-black"
                    style={{ width: 25, height: 25 }}
                  >
                    {feature.value ? `✔` : `✖`}
                  </p>
                  <p className={`${feature.value ? "fw-bold" : "text-light"}`}>
                    {feature.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-100 d-flex justify-content-center">
              <button
                className="border w-75 py-1"
                style={{ backgroundColor: color }}
                onClick={() => setSelected(plan.id)}
              >
                Choose Plan
              </button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Pricing;
