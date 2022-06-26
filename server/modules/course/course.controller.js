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

const addStudent=async(req,res)=>{
    if(!req.body.studentId || !req.body.courseId){
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
        res.status(200).json("addStudent")
    }else{
        res.status(400).json("erorrr")
    }


}

module.exports = {createCourse, deleteCourse, updateCourse,addStudent}




















































// if(!req.body.users || !req.body.name){
//     return res.status(400).send({messsage:"please fill all the feilds"})
// }
// var users =JSON.parse(req.body.users)
// if(users.length<2){
//     return res.status(400).send({messsage:"more than 2 users"})

// }
// //users.push(req.user)
// try {
//     const groupChat=await chatModel.create({
//         chatName:req.body.name,
//         users:users,
//         isGroupChat:true,
//         groupAdmin:req.user
//     })

//     const fullGroupChat=await chatModel.findOne({_id:groupChat._id})
//     .populate("users","-password")
//     .populate("groupAdmin","-password").populate("latestMessage", "content")
//             res.status(200).json({message:"createdGroupChat",fullGroupChat})
// } catch (error) {
//     return res.status(400).send({messsage:"Error",error})
// }
// }