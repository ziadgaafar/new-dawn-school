const mongoose=require("mongoose");


const courseSchema=new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    grade:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher",
        required:true
    },
    student:[{
        type:mongoose.Types.ObjectId,
        ref:"student",
        required:true
    }],
    assignment:{
        type:String,
    },
    exam:{
        type:String,
    },
    progress:{
        type:Number,
        default:10
    },
    day:{
        type:String,
        required: true
    },
    time:{
        type:String,
        required: true
    }
})

const courseModel=mongoose.model("course",courseSchema)
module.exports=courseModel