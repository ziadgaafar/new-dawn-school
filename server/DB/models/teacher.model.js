const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const generate = require("generate-password");
const salt_rounds = parseInt(process.env.SALT)

const teacherSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    courses:{type:Array, required:true},
    salary:{type:String, required:true},
    verified:{type:Boolean, default:false},
    role:{type:String,default:"teacher"}
})
teacherSchema.pre("save", function(next){
    const gpass = generate.generate({
        length: 8,
        lowercase: true,
        uppercase: true,
        numbers:true,
        symbols: true
    });
    this.password = gpass,salt_rounds
    next();
})

const teacherModel = mongoose.model("teacher",teacherSchema);
module.exports = teacherModel;
