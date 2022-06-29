const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
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
    cousreId:{
        type: mongoose.Types.ObjectId,
        ref: "course"
    },
    studentId:{
        type: mongoose.Types.ObjectId,
        ref:"student"
    }
}, {timestamps: true});

const assignmentModel = mongoose.model('assignment', assignmentSchema);
module.exports = assignmentModel