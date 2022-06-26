const courseModel = require("../../DB/models/course.Model");

const createCourse = async(req,res,next) => {
    const{subject, grade, teacher, student, progress, year} = req.body;
    const check = await courseModel.find({subject,grade});
    if(!check.length == []){
        res.status(400).json({Error:"This course already Existed"})
    }else{
        await new courseModel({subject, grade, teacher, student, progress, year}).save();
        res.json({Message:"Added Successfully"});
    }
}

const deleteCourse = async(req,res,next) => {
    const{cousreId} = req.body;
    const check = await courseModel.findById({_id:cousreId});
    if (check) {
        await courseModel.deleteOne({_id:check._id});
        res.status(200).json({Message:"deleted Successfully"});
    } else {
        res.status(400).json({Error:"Course Not Found"});
    }
}

const updateCourse = async(req,res,next) => {
    const{courseId, teacher} = req.body;
    const check = await courseModel.findById({_id:courseId});
    if (check) {
        await courseModel.updateOne({_id:check._id}, {teacher:teacher});
        res.status(200).json({Message:"Updated Successfully"});
    } else {
        res.status(400).json({Error:"course not found"});
    }
}

module.exports = {createCourse, deleteCourse, updateCourse}