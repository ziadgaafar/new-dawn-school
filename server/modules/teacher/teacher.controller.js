const teacherModel = require("../../DB/models/teacher.model");
const sendEmail = require("../../common/verification");
const jwt = require("jsonwebtoken");

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

module.exports = {teacherAddition, teacherVerification, showTeachertDash}