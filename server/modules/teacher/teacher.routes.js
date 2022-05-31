const route = require("express").Router();
const validationer = require("../../midleware/validationer");
const {teacherAddition, teacherVerification} = require("./teacher.controller");
const validateAdding = require("./teacher.validator");

route.post("/teacher/addTeacher",validationer(validateAdding),teacherAddition);
route.get("/teacher/confirm/:token",teacherVerification);

module.exports = route;