const route = require("express").Router();
const auth = require("../../midleware/authorizationer");
const endPoints = require("../../common/endPoints");
const validationer = require("../../midleware/validationer");
const {teacherAddition, teacherVerification, showTeachertDash} = require("./teacher.controller");
const validateAdding = require("./teacher.validator");

route.post("/teacher/addTeacher",validationer(validateAdding),teacherAddition);
route.get("/teacher/confirm/:token",teacherVerification);
route.get("/teacher/dashboard",auth(endPoints.teacherDash),showTeachertDash)

module.exports = route;