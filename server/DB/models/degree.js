const mongoose=require("mongoose")

const degreeSchema=new mongoose.Schema({
degreeExam:{type:Number},
degreeAssign:{type:Number},
degreeAttend:{type:Number},
student:{type:mongoose.Schema.Types.ObjectId,ref:"student"},
course:{type:mongoose.Schema.Types.ObjectId,ref:"course"},
teacher:{type:mongoose.Schema.Types.ObjectId,ref:"teacher"},
totalDegree:{type:Number},

})

const degreeModel=mongoose.model("degree",degreeSchema)

module.exports=degreeModel