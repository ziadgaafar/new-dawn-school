import React, { useEffect, useState } from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import { useLocation } from "react-router-dom";

const Footer = ({ dontShow }) => {
  const [show, setShow] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const pathname = location.pathname.split("/")[1];
    if (dontShow.includes(pathname)) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [location, dontShow]);
  return (
    show && (
      <MDBFooter className="text-center" color="white" bgColor="dark">
        <MDBContainer className="p-4">
          <section className="mb-4">
            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="facebook-f" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="twitter" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="google" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="instagram" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="linkedin-in" />
            </a>

            <a
              className="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <MDBIcon fab icon="github" />
            </a>
          </section>

          <section className="mb-4">
            <p>
              Smart Edtech is an internationally growing LMS company specialized
              in education technology. Our focus is on providing the best user
              experience for our customers, and their employees or students
            </p>
          </section>

          <section className="">
            <MDBRow>
              <MDBCol lg="2" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">About UND</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      The School
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      UND governance
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Faculties
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Privacy statement
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Accessibility
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg="2" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">RESOURCES</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Important dates
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      How to apply
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      A-Z index
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Policy Bank
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      FAQs
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg="2" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">STAFF</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Staff Connect
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Webmail
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Staff Directory
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Jobs at UND
                    </a>
                  </li>
                </ul>
              </MDBCol>

              <MDBCol lg="2" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">NEWS</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Events
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Find an expert
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="text-white">
                      Media centre
                    </a>
                  </li>
                </ul>
              </MDBCol>
              <MDBCol lg="2" md="6" className="mb-4 mb-md-0">
                <h5 className="text-uppercase">CONTACT US</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#!" className="text-white">
                      Student and public enquiries
                    </a>
                  </li>
                </ul>
              </MDBCol>
            </MDBRow>
          </section>
        </MDBContainer>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2020 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            NewDawnSchool.com
          </a>
        </div>
      </MDBFooter>
    )
  );
};
export default Footer;
