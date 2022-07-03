const chatModel = require("../../DB/models/chat.Model");
const courseModel = require("../../DB/models/course.Model");
const studentModel = require("../../DB/models/student.model")
const degreeModel = require("../../DB/models/degree");
const HttpError = require("../../common/http-error")

const createGroup = async function (name, users, admin) {
    const groupChat = await chatModel({
        chatName: name,
        users: users,
        isGroupChat: true,
        groupAdmin: admin,
    }).save();
};
const uploadDegree=async function (course,student,teacher) {
    const createDegree= await new degreeModel({
        teacher:teacher,
        course:course,
        student:student
    }).save();
}

const createCourse = async(req,res,next) => {
    try {
        const{subject, grade, teacher, progress, year, day, time} = req.body;
        const check = await courseModel.find({subject,grade});
        if(!check.length == []){
            return next(new HttpError("this course already existed", 400));
        }else{
            // var student2 =JSON.parse(student)
            const student3 = await studentModel.find({studentLevel: grade})
            let newCourse = await new courseModel({subject, grade, teacher, student:student3, progress, year, day, time}).save();
            for (let i = 0; i < student2.length; i++) {
                const element = student3[i];
                uploadDegree(newCourse._id, element, newCourse.teacher)
            }
            await createGroup(subject, student3, teacher);
            res.json({Message:"Added Successfully"});
        }
    } catch (error) {
        return next(new HttpError(error, 500));
    }
}

const deleteCourse = async(req,res,next) => {
    const{cousreId} = req.body;
    const check = await courseModel.findById({_id:cousreId});
    if (check) {
        await courseModel.deleteOne({_id:check._id});
        res.json({Message:"deleted Successfully"});
    } else {
        return next(new HttpError("course not found", 404));
    }
}

const updateCourse = async(req,res,next) => {
    const{courseId, teacher} = req.body;
    const check = await courseModel.findById({_id:courseId});
    if (check) {
        await courseModel.updateOne({_id:check._id}, {teacher:teacher});
        res.json({Message:"Updated Successfully"});
    } else {
        return next(new HttpError("course not found", 404));
    }
}

const addToChat = async function (chat, user) {
    const updateChat = await chatModel.findByIdAndUpdate({_id:chat},{users:user})
};

const addStudent=async(req,res)=>{
    if(!req.body.studentId || !req.body.courseId || !req.body.chatId){
        return next(new HttpError("please fill all fields", 400));
    }
    var student =JSON.parse(req.body.studentId)
    const createStudent=await courseModel.findById(req.body.courseId)
    if (createStudent){
        for (let i = 0; i < student.length; i++) {
            const element = student[i];
            uploadDegree(createStudent._id, element, createStudent.teacher)
            createStudent.student.push(element)
        }
        await courseModel.updateOne({_id:createStudent._id},{student:createStudent.student})
        await addToChat(req.body.chatId, createStudent.student)
        res.json("addStudent")
    }else{
        return next(new HttpError("unexpected error", 500));
    }
}
module.exports = {createCourse, deleteCourse, updateCourse,addStudent}