import { useEffect, useState, useRef } from 'react';
import { Peer } from "peerjs"

import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const Course = ({}) => {
  const { token, user } = useSelector((state) => state.auth);
  const { id } = useParams();


  return (
    
      <Container>
        <h1 className="fw-bold">Course: {id}</h1>
     
      </Container>
 
  );
}

export default Course;
