const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    },
    studentId:{
        type: mongoose.Types.ObjectId,
        ref: "student"
    },
    teacherId:{
        type: mongoose.Types.ObjectId,
        ref: "teacher"
    }
}, {timestamps: true});

const imageModel = mongoose.model('image', imageSchema);
module.exports = imageModel