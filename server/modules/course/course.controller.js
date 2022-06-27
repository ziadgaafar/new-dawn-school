const chatModel = require("../../DB/models/chat.Model");
const courseModel = require("../../DB/models/course.Model");

const createGroup = async function (name, users, admin) {
    const groupChat = await chatModel({
        chatName: name,
        users: users,
        isGroupChat: true,
        groupAdmin: admin,
    }).save();
};

const createCourse = async(req,res,next) => {
    const{subject, grade, teacher, student, progress, year} = req.body;
    const check = await courseModel.find({subject,grade});
    if(!check.length == []){
        res.status(400).json({Error:"This course already Existed"})
    }else{
        await new courseModel({subject, grade, teacher, student, progress, year}).save();
        await createGroup(subject, student, teacher);
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
    if(student.length<2){
        return res.status(400).send({messsage:"more than 2 student"})
    }
    const createStudent=await courseModel.findById(req.body.courseId)
    if (createStudent){
        for (let i = 0; i < student.length; i++) {
            const element = student[i];
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