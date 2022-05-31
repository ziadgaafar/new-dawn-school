const studentModel = require("../../DB/models/student.model");
const sendEmail = require("../../common/verification");
const jwt = require("jsonwebtoken");

const studentRegister=async(req,res)=>{
    try {
        const {studentOrParents,firstName,lastName,email,phone,country,city,dateOfBirth,studentLevel,studentCurrentSchool,submitQuestion}=req.body
        const findStudent=await studentModel.findOne({email})
        if(findStudent){
            res.status(400).json({message:"student already register"})
        }
        else{
            const newStudent=new studentModel({studentOrParents,firstName,lastName,email,phone,country,city,dateOfBirth,studentLevel,studentCurrentSchool,submitQuestion})
            const addStudent=await newStudent.save()
            var token = jwt.sign({addStudent}, process.env.TOKEN_KEY,{expiresIn:420});
            let message=`<h1>If You Registed in New Dawn School, please open link below to verify it was you</h1>
            <a href="${req.protocol}://${req.headers.host}/student/confirmed/${token}">click here</a>`
            sendEmail(email,message)
            res.status(200).json({message:"addStudent",addStudent})
        }
    } catch (error) {
        res.status(500).json({Message:"Server Error",error})
    }   
}

const confirmRegister=async(req,res)=>{
    try {
        const {token}=req.params
        const decoded =jwt.verify(token,process.env.TOKEN_KEY);
        email = decoded.addStudent.email;
        const student=await studentModel.findOne({email:email,isConfirmed:false},{})
        if (student){
            const updateStudent=await studentModel.findByIdAndUpdate({_id:student._id},{isConfirmed:true},{new:true})
            res.status(200).json({message:"confirmed",updateStudent})
        }else{
            res.status(400).json({message:"email is confirmed or not registed"})
        }
    } catch (error) {
        res.status(500).json({Message:"Server Error",error})
    }
}
  
module.exports={studentRegister,confirmRegister}