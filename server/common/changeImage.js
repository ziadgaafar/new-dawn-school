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

const downloadimage = async function (res,ImageId){
    const found = await imageModel.find({_id:ImageId})
    if (found) {
        let x = __dirname + "../../" + found[0].filePath

        res.download(x)
    } else {
        res.status(400).json({Error:"iamge not found"})
    }
}


let user;
const imageUpload = async (req, res, next) => {
    try{
        const teacher= teacherModel.findOne({_id:req.user._id})
        if(teacher){
            user="teacherId"
        }else{
            user="studentId"
        }
        const image =await new imageModel({
            user: req.user._id,
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
        }).save();
        downloadimage(res,image._id)
        if(teacher){
            await teacherModel.findByIdAndUpdate({_id:req.user._id},{image:image._id})
        }else{
            await studentModel.findByIdAndUpdate({_id:req.user._id},{image:image._id})

        }
    }catch(error) {
        res.status(400).send(error.message);
    }
}


module.exports=imageUpload