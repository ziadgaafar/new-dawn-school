import React from 'react'
import "./parents.css";
import {  Link } from "react-router-dom";
import ph from "../../images/parents.jpeg";
const Parents = () => {
  return (
    <div>
      <img src={ph} alt="ph" className="parents-photo d-flex w-100" />
      <h1 className='header'>
        PROSPECTIVE PARENTS
      </h1>
      <div className='content row w-80 '>
         <div className='parent-card col-12 col-lg-3'>
           <div className='parents-card'>

           <Link className="text-black" as={Link} to={"/parents"}> Prospective Parents</Link>
                
                <hr></hr>
            <Link className="text-muted" as={Link} to={"/AdmissionsInfo"}>  Admissions Information</Link>
           </div>
          
         </div>
         <div className=' about-parents col-12 col-lg-9'>
           <p>
           Thank you for your interest in enrolling your children at the NEW DAWN International School – New Administrative Capital. Our 
            school is an excellent choice for parents who are looking to offer their children a top-quality, international education within a 
            vibrant and nurturing environment that encourages children to achieve their full potential and follow their dreams. <br></br>
            <br></br>
            At our school, we welcome students who exhibit a willingness to learn in a collaborative environment and who are eager to 
            participate in a global community. Our curriculum is designed to give students a solid foundation of knowledge and skills, a 
            love of life-long learning, and the ability to adapt to and lead change, so they graduate with confidence and an edge that allows 
            them to succeed in their future.<br></br>
            <br></br>
            If you have not already done so, we strongly recommend that you book an appointment to visit the school, meet with our staff, 
            and see our school in action. This step is an important part of the admission process, which also includes an application and 
            diagnostic test to assess the appropriate grade levels and classes for the students.
            For more information about our admissions, policy, placement overview, and our enrollment process <br></br>
            <br></br>
           </p>
         </div>
      </div>
    </div>
  )
}

export default Parents
