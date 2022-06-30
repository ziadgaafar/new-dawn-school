const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const generate = require("generate-password");
const salt_rounds = parseInt(process.env.SALT)

const teacherSchema = new mongoose.Schema({
    email:{type:String   , unique:true},
    password:{type:String},
    firstname:{type:String   },
    lastname:{type:String   },
    courses:[{type:mongoose.Schema.Types.ObjectId,ref:"course"  }],
    salary:{type:String   },
    verified:{type:Boolean, default:false},
    isAccepted: {type: Boolean, default:false},
    role:{type:String,default:"teacher"},
    image: { type: mongoose.Types.ObjectId,ref:"image"}
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
