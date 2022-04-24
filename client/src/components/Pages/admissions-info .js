import React from 'react'
import "./parents.css";
import {  Link } from "react-router-dom";


import ph from "../../images/info.jpeg";


const AdmissionsInfo  = () => {
  return (
    <div>
      <img src={ph} alt="ph" className="parents-photo " />
      <h1 className='header'>
      ADMISSIONS INFORMATION

      </h1>
      <div className='content row w-80 '>
         <div className='parent-card col-12 col-lg-3'>
           <div className='parents-card'>
            <Link className="text-muted" as={Link} to={"/parents"}> Prospective Parents</Link>
                
                <hr></hr>
            <Link className="text-black" as={Link} to={"/AdmissionsInfo"}>  Admissions Information</Link>
           </div>
          
         </div>
         <div className=' about-parents col-12 col-lg-9'>

           <h2 className='h2'>NON-SELECTIVE ADMISSION POLICY</h2><br></br>
           <p>
           NEW DAWN NAC is non-selective, although it is highly academic. The criterion for acceptance in a class is academic attainment, 
            not age. Although age acts as a limiting factor, it is possible to find a small age gap in the same class. In general, any student 
            willing to learn is accepted.
           </p><br></br>

           <h2 className='h2'>PLACEMENT OVERVIEW</h2><br></br>
           <p>
           There are no academic requirements for acceptance into Kindergarten (three and a half to five years of age). Prospective 
            students at these levels are interviewed; at the youngest age, they must be toilet-trained and able to speak and follow simple 
            instructions. <br></br> <br></br>

            All other prospective students take diagnostic tests in the core subjects. These tests help to determine if the students have 
            attained the minimum expected standard for each subject. The school then makes final placement decisions but can resort to 
            various strategies to help bring a student to the required level. For example, there is the option of attending summer school or 
            perhaps extra classes in a subject. Special academic support is taken very seriously by the school.
           </p><br></br>

           <h2 className='h2'>ENROLLMENT PROCESS</h2><br></br>
           <p> The admission process is intended to be personal and informative for all prospective families. </p><br></br>
           <span>Application and Required Documents </span> <br></br><br></br>
           <p>There is no application deadline, but it is recommended that the admission process be initiated early on. Applications are 
            accepted on a space available basis throughout the school year. Please note that there is a 'joining fee' due to initiate the 
            admission process and cover administrative costs.</p><br></br>
            <ul>
              <li>Along with the student application form, you will be asked to provide us with certain documents:</li>
              <li>Completed Application Form</li>
              <li>Copy of Identity Card or Passport</li>
              <li>Two Passport Photographs</li>
              <li>Final School Report from Previous School</li>
            </ul>  <br></br>
            <span>Testing </span> <br></br><br></br>
            <p>
            As part of the admission process, students applying to enter Grades 2 and above sit for diagnostic test to help the school place 
            them in the appropriate class depending on their needs. Students who require additional support can be placed in remedial 
            classes and put on a clear academic path that will allow them join their peers once they are ready. Upon completion, the 
            diagnostic tests are marked and a decision upon placement is made by the school.
            </p><br></br>



           <h2 className='h2'>ADMISSION DECISIONS</h2><br></br>
           <p>
           Admission decisions are made after careful evaluation of the candidates. Results of diagnostic testing and previous school 
            records are considered on a case-by-case basis. Additional criteria for admission include motivation, social and emotional 
            development, willingness to work hard, and the ability of CADMUS® International School – New Administrative Capital to 
            accommodate the needs of the candidate. <br></br> <br></br>

            Please note that, in order to complete the registration, the above-mentioned documents should be presented upon initiation 
            of the admission process in support of the application. A final admission decision cannot be made without this information.<br></br> <br></br>

            Once accepted and the required fees paid, a place for the student is reserved.
           </p><br></br>
         </div>
      </div>
    </div>
  )
}

export default AdmissionsInfo 
