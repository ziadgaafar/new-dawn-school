const studentModel = require("../../DB/models/student.model");
const teacherModel = require("../../DB/models/teacher.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        const checkStudent = await studentModel.findOne({email});
        if (checkStudent) {
            if (checkStudent.password == password && checkStudent.verified == true) {
                //token = jwt.sign(checkTeacher,process.env.TOKEN_KEY);
                res.json({message:"Completed"});
            } else {
                res.json({Error:"student password is incorrect!! or not verified"})
            };
        } else {
            const checkTeacher = await teacherModel.findOne({email});
            if (checkTeacher) {
                if (checkTeacher.password == password && checkTeacher.verified == true) {
                        //token = jwt.sign(checkTeacher,process.env.TOKEN_KEY);
                        res.json({message:"Completed"});
                } else {
                        res.json({Error:"teacher password is incorrect!! or not verified"})
                };
            } else {
                res.json({Error:"User not found!!"});
            }
        }
    } catch (error) {
        res.status(500).json({Message:"Server Error",error})
    }
}

module.exports = userLogin;