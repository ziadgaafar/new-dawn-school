import React from 'react'
import "./apply.css";
import ph from "../../images/apply.png";
import ph2 from "../../images/applyHome.png";
import { Link } from 'react-router-dom';

const apply = () => {
  return (
    <div>
       <img src={ph} alt="ph" className="apply-photo w-100" />
       <div className='apply-header w-100 '>
            <h1 className=''>
                    Apply Online
            </h1>
            <p className='justify-content-center'>
                Are you ready to join New Dawn School? <br></br>
                We're delighted by your interest and looking forward to welcoming you to our family.
            </p>
       </div>
       

      <div className='apply-body row w-100 justify-content-center'>
         <div className='col-lg-5 col-8'>
          <h1 className='apply-h '>
          The first step

          </h1> <br></br><br></br>
          <p className='apply-p'>
            The first step To apply for admission to Crimson Global Academy, you must have an initial
            assessment meeting with one of our Academic Advisors.
            <br></br><br></br>
            This is not a test, nor an interview, but rather a chance for the school to 
            understand your family’s goals, evaluate your needs and advise on a suitable 
            educational roadmap and enrolment option. 
            <br></br><br></br>
            For a full understanding of our admissions criteria and enrolment options
            please visit <span ><Link className='text-danger' as={Link} to={"/AdmissionsInfo"}>here</Link></span>.
            <br></br><br></br>
            If you’re ready to speak to an Academic Advisor you may book an in-person 
            or online meeting  <span ><Link className='text-danger' as={Link} to={"/form"}>here</Link></span>.
            <br></br><br></br>
            If you’re seeking any further guidance or have smaller questions or concerns
            please feel free to <span ><Link className='text-danger' as={Link} to={"/contact"}>Contact With Us</Link></span>.
          </p>
         </div>
         
              <img src={ph2} alt="ph" className="apply-body-photo col-xl-3  col-lg-4  col-sm-7 col-10 " />
       
      </div>
    </div>
  )
}

export default apply
