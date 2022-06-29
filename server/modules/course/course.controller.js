const chatModel = require("../../DB/models/chat.Model");
const courseModel = require("../../DB/models/course.Model");
const degreeModel = require("../../DB/models/degree");

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
    const{subject, grade, teacher, student, progress, year, day, time} = req.body;
    const check = await courseModel.find({subject,grade});
    if(!check.length == []){
        res.status(400).json({Error:"This course already Existed"})
    }else{
        var student2 =JSON.parse(student)
        let newCourse = await new courseModel({subject, grade, teacher, student2, progress, year, day, time}).save();
        for (let i = 0; i < student2.length; i++) {
            const element = student2[i];
            uploadDegree(newCourse._id, element, newCourse.teacher)
        }
        await createGroup(subject, student2, teacher);
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

const addToChat = async function (chat, user) {
    const updateChat = await chatModel.findByIdAndUpdate({_id:chat},{users:user})
};

const addStudent=async(req,res)=>{
    if(!req.body.studentId || !req.body.courseId || !req.body.chatId){
        return res.status(400).send({messsage:"please fill all the feilds"})
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
        res.status(200).json("addStudent")
    }else{
        res.status(400).json("erorrr")
    }
}
module.exports = {createCourse, deleteCourse, updateCourse,addStudent}