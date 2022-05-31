const route = require("express").Router();
//controllers call
const{studentRegister,confirmRegister,showStudentDash}=require("./student.controller");
//validation call
const validationer = require("../../midleware/validationer");
const validateSignup =require("./student.validator");
//authorization call
const authorizationer = require("../../midleware/authorizationer");
const endPoints = require("../../common/endPoints");

route.post("/student/Register",validationer(validateSignup),studentRegister)
route.get("/student/confirmation/:token",confirmRegister);
route.get("/student/dashboard",authorizationer(endPoints.studentDash),showStudentDash);

module.exports = route