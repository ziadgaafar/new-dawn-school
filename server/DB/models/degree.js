const mongoose=require("mongoose")

const degreeSchema=new mongoose.Schema({
degreeExam:{type:Number,default:0},
degreeAssign:{type:Number,default:0},
degreeAttend:{type:Number,default:0},
student:{type:mongoose.Schema.Types.ObjectId,ref:"student"},
course:{type:mongoose.Schema.Types.ObjectId,ref:"course"},
teacher:{type:mongoose.Schema.Types.ObjectId,ref:"teacher"},
totalDegree:{type:Number,default:0},
})

const degreeModel=mongoose.model("degree",degreeSchema)

module.exports=degreeModel