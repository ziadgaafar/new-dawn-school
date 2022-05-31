const mongoose=require("mongoose");
const bcrypt = require("bcrypt");
const generate = require("generate-password");
const salt_rounds = process.env.SALT;

const studentSchema=new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String},
    studentOrParents:{type:String, required:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    phone:{type:String},
    country:{type:String, required:true},
    city:{type:String, required:true},
    dateOfBirth: {type: String, required: true, trim: true},
    studentLevel:{type:String, required:true},
    studentCurrentSchool:{type:String, required:true},
    submitQuestion:{type:String, required:true},
    isConfirmed:{type:Boolean, default:false},
    role:{type:String,default:"student"}
})
studentSchema.pre("save", function (next){
    const gpass = generate.generate({
        length: 8,
        lowercase: true,
        uppercase: true,
        numbers:true,
        symbols: true
    });
    this.password = gpass;
    next();
})

const studentModel=mongoose.model("student",studentSchema)
module.exports=studentModel