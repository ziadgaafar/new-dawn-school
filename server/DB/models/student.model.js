const mongoose = require("mongoose");
const generate = require("generate-password");

const studentSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  studentOrParent: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  country: { type: String },
  city: { type: String },
  dateOfBirth: { type: String, trim: true },
  studentLevel: { type: String },
  submitQuestion: { type: String },
  isConfirmed: { type: Boolean, default: false },
  role: { type: String, default: "student" },
});
studentSchema.pre("save", function (next) {
  const gpass = generate.generate({
    length: 8,
    lowercase: true,
    uppercase: true,
    numbers: true,
  });
  this.password = gpass;
  next();
});

const studentModel = mongoose.model("student", studentSchema);
module.exports = studentModel;
