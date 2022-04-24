import React from 'react'
import ph from "../../images/contact.jpg";
import "./contact.css";
import { Form, Row, Col ,Button } from "react-bootstrap";

const Contact = () => {
  return (
    <div>
      <img src={ph} alt="ph" className="contact-photo w-100" />
      <h1 className="mb-5 header">
      CONTACT US
      </h1>
      <div className='contact row w-100'>
        <div className='col-12 col-lg-4 justify-content-center'>
          <div  className='contact-card'>
            <div className='contact-card-content'>
              <h2>
                E-MAIL
              </h2>
              <p>
              newdawn@gmail.com
              </p>
              <hr></hr>
              <h2>
              Website
              </h2>
              <p>
              newdawn.com
              </p>
            </div>
          </div>
          

        </div>
  
        <Form className='mb-5 col-10 col-lg-5 contact-form'>
         <Row>

      
          <Form.Group className="mb-5 col-12" controlId="formGridName">
            <Form.Label className='font-weight-bold'>Name</Form.Label>
            <Form.Control placeholder="Enter Name" />
          </Form.Group>
         
            <Form.Group  className="mb-5 col-lg-6" controlId="formGridEmail">
              <Form.Label className='font-weight-bold'>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-5 col-lg-6" controlId="formGridPassword">
              <Form.Label className='font-weight-bold'>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
         

          <Form.Group className="mb-5 col-12" controlId="formGridAddress1">
            <Form.Label className='font-weight-bold'>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>

          <Form.Group className="mb-5 col-12" controlId="formGridAddress2">
            <Form.Label className='font-weight-bold'> Message</Form.Label>
            <Form.Control as="textarea" rows={3}  placeholder="Enter Your Message" />
          </Form.Group>

        

      </Row>
          <input className='submit-but ' type="submit" value="Submit" />
          
        </Form>
      </div>
      
    </div>
  )
}

export default Contact
