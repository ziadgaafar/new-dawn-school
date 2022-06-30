const studentModel = require("../DB/models/student.model")
const teacherModel = require("../DB/models/teacher.model")

const changePassword=async(req,res)=>{
    const {oldPassword,newPassword,confirmedPassword}=req.body
    const foundStudent= await studentModel.findOne({_id:req.user._id,password:oldPassword})
    const foundTeacher= await teacherModel.findOne({_id:req.user._id,password:oldPassword})
    if (!foundStudent&&!foundTeacher ){
        res.status(400).json({Error:"user not found or old password not correct"})
    }
    else{
      if (newPassword==confirmedPassword){
        if (foundStudent){
          await studentModel.updateOne({_id:req.user._id},{password:newPassword})
          res.status(200).json({message:"updateed successfully"})
        }
        else{
          await teacherModel.updateOne({_id:req.user._id},{password:newPassword})
          res.status(200).json({message:"updateed successfully"})
        }
      }else{
        res.status(400).json({Error:"confirmed password not equal new password"})
        }
  }
    
  }
module.exports=changePassword