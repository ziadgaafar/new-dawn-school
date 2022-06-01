const route = require("express").Router();
const auth = require("../../midleware/authorizationer");
const endPoints = require("../../common/endPoints");
const validationer = require("../../midleware/validationer");
const {
  teacherAddition,
  teacherVerification,
  showTeachertDash,
} = require("./teacher.controller");
const validateAdding = require("./teacher.validator");

route.post("/addTeacher", validationer(validateAdding), teacherAddition);
route.get("/confirm/:token", teacherVerification);
route.get("/dashboard", auth(endPoints.teacherDash), showTeachertDash);

module.exports = route;
