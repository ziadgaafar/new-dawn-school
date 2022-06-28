const teacherModel = require("../../DB/models/teacher.model");
const courseModel=require("../../DB/models/course.Model")
const sendEmail = require("../../common/verification");
const jwt = require("jsonwebtoken");
const degreeModel=require("../../DB/models/degree")

const teacherAddition = async (req,res,next) => {
    try {
        const {email,firstname,lastname,courses,salary} = req.body;
        const found = await teacherModel.findOne({email});
        if (found) {
            res.status(400).json({Error:"User Already Registed!"})
        } else {
            const added = await new teacherModel({email,firstname,lastname,courses,salary}).save();
            const token = jwt.sign({added}, process.env.TOKEN_KEY,{expiresIn:420});
            const mes = `<h1>If You Registed in New Dawn School, please open link below to verify it was you</h1>
            <a href="${req.protocol}://${req.headers.host}/teacher/confirm/${token}">click here</a>`;
            await sendEmail(email,mes);
            res.json({message:"Added Successfully"})
        }
    } catch (error) {
        res.status(500).json({Message:"Server Error",error})
    }
}

const teacherVerification = async (req,res,next) => {
    try {
        const {token} = req.params;
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const email = decoded.added.email;
        const check = await teacherModel.findOne({email:email});
        if (check) {
            if (check.verified) {
                res.json({Error:"User Already Verified!"})
            } else {
                await teacherModel.findByIdAndUpdate(check._id,{verified:true},{new:true});
                res.json({message:"Updated Successfully"});
            }
        } else {
            res.status(400).json({Error:"User Not Registed!"})
        }
    } catch (error) {
        res.status(500).json({Message:"Server Error",error})
    }
}
const showTeachertDash = () =>{
    console.log("working teacher");
}

const showCourses = async(req,res,next) =>{
    const check = await courseModel.find({teacher:req.user._id});
    if (!check==[]) {
        res.status(200).json({check});
    } else {
        res.status(400).json({Error:"No Founded Courses"})
    }
}

const uploadBook=async(req,res)=>{
    const {grade,book} = req.body;
    const check = await courseModel.find({teacher:req.user._id, grade:grade});
    console.log(check);
    if (check) {
        console.log(check._id);
        await courseModel.updateOne({_id:check[0]._id},{book:book})
        res.status(200).json({Message:"Updated Successfully"})
    } else {
        res.status(400).json({Error:"course not found"})
    }
}


const uploadExam=async(req,res)=>{
    const {grade,exam} = req.body;
    const check = await courseModel.find({teacher:req.user._id, grade:grade});
    if (check) {
        await courseModel.updateOne({_id:check[0]._id},{exam:exam})
        res.status(200).json({Message:"Updated Successfully"})
    } else {
        res.status(400).json({Error:"course not found"})
    }
}

const uploadassign=async(req,res)=>{
    const {grade,assign} = req.body;
    const check = await courseModel.find({teacher:req.user._id, grade:grade});
    console.log(check);
    if (check) {
        console.log(check._id);
        await courseModel.updateOne({_id:check[0]._id},{assignment:assign})
        res.status(200).json({Message:"Updated Successfully"})
    } else {
        res.status(400).json({Error:"course not found"})
    }
}

const uploadDegree=async (req,res)=>{
    const {degreeExam,degreeAssign,degreeAttend,courseId,studentId}=req.body 

const createDegree= await degreeModel.create({
    degreeExam:degreeExam,
    degreeAssign:degreeAssign,
    degreeAttend:degreeAttend,
    teacher:req.user._id,
    course:courseId,
    student:studentId,
    totalDegree:degreeAssign+degreeAttend+degreeExam});
res.json({message:"doneeeee",createDegree})
}



module.exports = {teacherAddition, teacherVerification, uploadDegree,showTeachertDash,showCourses,uploadBook,uploadExam,uploadassign}