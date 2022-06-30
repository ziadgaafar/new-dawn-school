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
    userId:{
        type: mongoose.Types.ObjectId
    }
   
}, {timestamps: true});

const imageModel = mongoose.model('image', imageSchema);
module.exports = imageModel