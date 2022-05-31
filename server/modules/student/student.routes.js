const route = require("express").Router();
const{studentRegister,confirmRegister}=require("./student.controller");
const validationer = require("../../midleware/validationer");
const validateSignup =require("./student.validator");

route.post("/student/Register",validationer(validateSignup),studentRegister)
route.get("/student/confirmation/:token",confirmRegister)

module.exports = route