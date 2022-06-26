const route = require("express").Router();
//controllers call
const {
  studentRegister,
  confirmRegister,
  showStudentDash,
  showCourses,
} = require("./student.controller");
//validation call
const validationer = require("../../midleware/validationer");
const validateSignup = require("./student.validator");
//authorization call
const authorizationer = require("../../midleware/authorizationer");
const endPoints = require("../../common/endPoints");

route.post("/register", validationer(validateSignup), studentRegister);
route.get("/confirmation/:token", confirmRegister);
route.get(
  "/dashboard",
  authorizationer(endPoints.studentDash),
  showStudentDash
);
route.get("/course/all", authorizationer(), showCourses)

module.exports = route;
