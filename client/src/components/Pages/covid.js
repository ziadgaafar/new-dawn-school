import React from "react";
import ph from "../../images/covid.png";
import { Container, Row } from "react-bootstrap";

const covid = () => {
  return (
    <Container>
       <Row>
          <img src={ph} alt="ph" className="" />
       </Row> <br></br>
       <Row className="mb-5">
           <h5 className="font-weight-bold">
           With schools shut across the world, millions of children have had to adapt to new types of learning.
           </h5>
           <br></br><br></br>
           <p  className="font-weight-bold text-muted">
           While countries are at different points in their COVID-19 infection rates, worldwide there are currently more
            than 1.2 billion children in 186 countries affected by school closures due to the pandemic. In Denmark, children
            up to the age of 11 are returning to nurseries and schools after initially closing on 12 March, but in South Korea
            students are responding to roll calls from their teachers online.
            <br></br><br></br>
            With this sudden shift away from the classroom in many parts of the globe, some are wondering whether the
            adoption of online learning will continue to persist post-pandemic, and how such a shift would impact the 
            worldwide education market.
            <br></br><br></br>
            Even before COVID-19, there was already high growth and adoption in education technology, with global edtech 
            investments reaching US$18.66 billion in 2019 and the overall market for online education projected to 
            reach $350 Billion by 2025. Whether it is language apps, virtual tutoring, video conferencing tools, or online 
            learning software, there has been a significant surge in usage since COVID-19......
           </p>
       </Row>
    </Container>
  )
}

export default covid
