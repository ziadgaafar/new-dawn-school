
import React from "react";
import "./about.css";
import ph from "../../images/about-body1.png";
import ph2 from "../../images/about-body2.png";

import first from "../../images/first-slider.png";
import secound from "../../images/secound-slider.jpg";
import third from "../../images/third-slider.png";

import { Container, Row ,Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";



const About = () => {
  return (
    <div className=''>
     
      {/*Header*/}
      <div className="about-header w-100 ">
        <div className="about-header-content ">
          <h1 className="font-weight-bold pt-5 ">
            About NDS
          </h1>
          <p className="font-weight-bold ">
            New Dawn School is a world-class online high school designed for ambitious students.
          </p>
        </div>
      </div>
      
      {/*first div in the body */}

      <Container className="mb-5">
        <Row className="pt-5 w-100">
          <div className="col-lg-6 col-12">
            <h1 className=" about-h font-weight-bold   ">
            What is New Dawn School?
            </h1>
            <br></br><br></br>
            <p>
            New Dawn School (NDS) is a world-class online high 
            designed for ambitious students.
            <br></br><br></br>
            Our mission is simple: we provide premium education without 
            the constraints of physical schooling. We connect the world's leading 
            teachers to a small, live class of international learners, wherever they are.
            <br></br><br></br>
            Through our online high school we aim to provide:
            <br></br><br></br>
            </p>
            <ul>
                <li>effective, challenging and transformative schooling</li>
                <li>access to cutting-edge educational technologies</li>
                <li>a ‘whole person’ approach to our students</li>
                <li>a connection to the global learning environment</li>
                <li>a diverse programme of extracurricular actitivies</li>
                <li>a positive school culture</li>
              </ul>  <br></br>
          </div>
          <div className="col-lg-6 col-12">
          <img src={ph} alt="ph" className="w-100" />
          </div>
        </Row>
      </Container>

 {/*secound div in the body */}

      <div className="about-mid-page w-100">
       
  
        <Row className="pt-5 w-100 pl-5 ">
          <div className="col-xl-6 col-12 d-flex justify-content-center   ">
           <img src={ph2} alt="ph" className="secound-img " />
          </div>
          <div className=" col-xl-6 col-12 pt-5">
            <h1 className=" about-h font-weight-bold  pt-3 ">
              Why New Dawn School?
            </h1>
            <br>
             </br><br></br>
            <p>
              At NDS, we want to provide any student, anywhere, at any age, to be able to access online classes taught by world-class teachers.
              <br></br> <br></br>
              We provide: 
            </p>
           
            <ul>
                <li>Rigorous, reputable and internationally recognised curriculum. Pupils take International GCSE and/or A-Level subjects, or Advanced Placement courses.</li>
                <li>Leading technology to provide a rich online experience</li>
                <li>Flexibility both in terms of location as well as enrolment options.</li>
                
              </ul>  <br></br>
          </div>
         
        </Row>
        
      </div>
  {/*third div in the body */}
   
  <div className=" slider-div w-100">
    
      <Row className="pt-5 w-100">
        <div className="col-lg-5 col-10 p-5 ml-5">
         
            <h1 className="about-h font-weight-bold ">
            Is NDS for you?
            </h1> <br></br> <br></br>
            <p className="font-weight-bold">
            NDS was founded for students and families who seek 
            personalized online education opportunities, which 
            provide flexibility and a dynamic pace of learning. 
            We are the right online school for you:
            </p>
    
        </div>

        <div className="col-lg-5 col-10 p-5 ml-5 w-100">
          <Carousel className="slider pb-5 " variant="dark">          
            <Carousel.Item className="row slider-content p-4 ">  
                           
                <div className="col-xl-5 col-12 slider-img-div ">
                  <img className="slider-img"  src={first} alt="First slide" />
                </div>             
                <div className="col-xl-7 col-12 slider-caption ">
                  <h1 className="text-black ">01.</h1>
                  <p className=" text-muted ">If you are looking for a premium, world-class education at 
                  an affordable price. Our teachers have over 20 years of 
                  experience and are passionate about educating the 
                  leaders of tomorrow
                  </p>
                </div> 
                             
            </Carousel.Item>
           
            <Carousel.Item className="row slider-content p-4 ">  
                            
            <div className="col-xl-5 col-12 slider-img-div ">
              <img className="slider-img"  src={secound} alt="secound slide" />
            </div>             
            <div className="col-xl-7 col-12 slider-caption ">
              <h1 className="text-black ">02.</h1>
              <p className=" text-muted ">If you want to connect and study with other ambitious students 
                from around the world through our online classroom. 
                Our students are passionate and driven to extend 
                their schooling beyond the traditional experience
                to maximize their potential.
             
              </p>
            </div> 
                         
            </Carousel.Item>

            <Carousel.Item className="row slider-content p-4">  
                   
                <div className="col-xl-5 col-12 slider-img-div ">
                  <img className="slider-img"  src={third} alt="third slide" />
                </div>             
                <div className="col-xl-7 col-12 slider-caption ">
                  <h1 className="text-black ">03.</h1>
                  <p className=" text-muted ">If you are pursuing higher education opportunities overseas in countries 
                    like the United States or United Kingdom. We are powered by Crimson 
                    Education, the world’s leading university admissions consultant.
                  </p>
                </div> 
                            
            </Carousel.Item>



          </Carousel>
        </div>
      </Row>
    
  </div>
  {/*fourth div in the body */}

    <div className="about-mid-page p-5 fourth-div">
      
        <h1 className="fourth-h font-weight-bold pt-5 ">
        Ready to take the next step?
        </h1>

        
        <Link as={Link} to={"/form"} >
           <button className="signup-put ">SIGN UP</button>
        </Link>  
      
    </div>

    </div>
  )
}

export default About
