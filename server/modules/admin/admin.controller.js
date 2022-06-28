const studentModel = require("../../DB/models/student.model");
const teacherModel = require("../../DB/models/teacher.model");
const sendEmail = require("../../common/verification")

const unAceptedTeacher = async(req,res,next) => {
    const allTeachers = await teacherModel.find({isAccepted: false});
    if (allTeachers.length == 0) {
        res.json({Message:"no teachers to accept"})
    } else {
        res.status(200).json({techers: allTeachers})
    }
}

const acceptTeacher = async(req,res,next) => {
    const {teacherId} = req.body
    const found = await teacherModel.findOne({_id:teacherId});
    if (found) {
        if (found.isAccepted == true) {
            res.status(400).json({Error:"this teacher is already accepted"})
        } else {
            await teacherModel.findOneAndUpdate({_id:teacherId}, {isAccepted:true});
            const message = `
                <div style="text-align:center">
                    <h1>You Have Been Accepted To New Dawn School You Can Now Login To Your Account!</h1>
                    <h2>Your password: ${found.password}</h2>
                </div>
            `;
            sendEmail(found.email, message)
            res.status(200).json({Message:"teacher is accepted successfully"})
        }
    } else {
        res.status(400).json({Error:"this teacher didn't register"})
    }
}

const unAceptedStudent = async(req,res,next) => {
    const allStudents = await studentModel.find({isAccepted: false});
    if (allStudents.length == 0) {
        res.json({Message:"no teachers to accept"})
    } else {
        res.status(200).json({students: allStudents})
    }
}

const acceptStudent = async(req,res,next) => {
    const {studentId} = req.body
    const found = await studentModel.findOne({_id:studentId});
    if (found) {
        if (found.isAccepted == true) {
            res.status(400).json({Error:"this teacher is already accepted"})
        } else {
            await studentModel.findOneAndUpdate({_id:studentId}, {isAccepted:true});
            const message = `
                <div style="text-align:center">
                    <h1>You Have Been Accepted To New Dawn School You Can Now Login To Your Account!</h1>
                    <h2>Your password: ${found.password}</h2>
                </div>
            `;
            sendEmail(found.email, message)
            res.status(200).json({Message:"student is accepted successfully"})
        }
    } else {
        res.status(400).json({Error:"this teacher didn't register"})
    }
}

module.exports = {unAceptedTeacher, acceptTeacher, unAceptedStudent, acceptStudent}