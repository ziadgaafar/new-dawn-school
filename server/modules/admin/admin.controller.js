const studentModel = require("../../DB/models/student.model");
const teacherModel = require("../../DB/models/teacher.model");

const acceptTeacher = async(req,res,next) => {
    const {teacherId} = req.body;
    const find = await teacherModel.findOne({_id:acceptTeacher})
    if (find) {
        await teacherModel.updateOne({_id:find._id},{accepted:true});
        res.json({Message:"Teacher Accepted"});
    } else {
        res.status(400).json({Error:"teacher not found to be accepted"})
    }
}