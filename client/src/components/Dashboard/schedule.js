import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHttpClient } from "../../hooks/http-hook";

const Schedule = ({}) => {
  const { token } = useSelector((state) => state.auth);
  const { sendRequest, isLoading } = useHttpClient();
  const [data, setData] = useState(null);

  useLayoutEffect(() => {
    if (token) {
      (async () => {
        const data = await sendRequest({
          url: "/student/timetable",
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(data);
      })();
    }
  }, [token]);

  return (
    <>
      <Container>
        <h1 className="text-center text-lg-left fw-bold">Schedule</h1>
      </Container>

      {data && data.length > 0 ? (
        <Container>
          <Table bordered hover size="sm">
            <thead>
              <tr className="">
                <th className="fw-bold">Subject</th>
                <th className="fw-bold">Grade</th>
                <th className="fw-bold">Day</th>
                <th className="fw-bold">Time</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.time}>
                  <td className="fw-bolder">
                    {item.subject.charAt(0).toUpperCase() +
                      item.subject.slice(1)}
                  </td>
                  <td className="fw-bolder">{item.grade}</td>
                  <td className="fw-bolder">
                    {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                  </td>
                  <td className="fw-bolder">
                    {item.time.split(" ")[0] +
                      " " +
                      item.time.split(" ")[1].toUpperCase()}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      ) : (
        <div className="py-5 d-flex justify-content-center">
          {isLoading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <h2>No Schedule</h2>
          )}
        </div>
      )}
    </>
  );
};

export default Schedule;
