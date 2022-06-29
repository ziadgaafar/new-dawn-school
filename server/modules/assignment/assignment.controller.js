const assignmentModel = require('../../DB/models/assignment.model');

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

const assignUpload = async (req, res, next) => {
    const courseId = req.body
    const studentId = req.user._id
    try{
        const file = new assignmentModel({
            courseId: courseId,
            studentId: studentId,
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
        }).save();
        res.status(201).send('File Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const getAssign = async (req, res, next) => {
    const {courseId} = req.body
    try{
        const files = await assignmentModel.find({courseId: courseId});
        res.status(200).json(files);
    }catch(error) {
        res.status(400).json(error.message);
    }
}

module.exports = { assignUpload, getAssign}