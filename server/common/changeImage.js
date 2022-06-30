const teacherModel=require("../DB/models/teacher.model")
const imageModel = require("../DB/models/image.model");
const studentModel = require("../DB/models/student.model");



const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
}

const displayimage = async  (req,res)=>{
    const foundStudent = await studentModel.find({_id:req.user._id})
    const foundTeacher = await teacherModel.find({_id:req.user._id})
    
    if (!foundStudent && !foundTeacher) {
        res.status(400).json({Error:"not found user"})
    } else {
        if(foundStudent.length>0){
            const image=await imageModel.findOne({userId:req.user._id})
            res.status(200).json({message:"done",image})
        }else if(foundTeacher.length>0){
            const image=await imageModel.findOne({userId:req.user._id})
            res.status(200).json({message:"done",image})
        }
    }
}


const imageUpload = async (req, res, next) => {
    try{
        const teacher= teacherModel.findOne({_id:req.user._id})
       
        const image =await new imageModel({
            userId: req.user._id,
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
        }).save();
        if(teacher){
            await teacherModel.findByIdAndUpdate({_id:req.user._id},{image:image._id})
        }else{
            await studentModel.findByIdAndUpdate({_id:req.user._id},{image:image._id})
        }
        res.status(200).json({message:"updated successfully",image})
    }catch(error) {
        res.status(400).send(error.message);
    }
}


module.exports={imageUpload,displayimage}