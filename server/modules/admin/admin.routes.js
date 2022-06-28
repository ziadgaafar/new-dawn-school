const route = require("express").Router();

const {unAceptedTeacher, 
    acceptTeacher, 
    unAceptedStudent, 
    acceptStudent
} = require("./admin.controller");

route.get("/teachers/", unAceptedTeacher)
route.post("/teachers/accept", acceptTeacher)
route.get("/students/", unAceptedStudent)
route.post("/students/accept", acceptStudent);

module.exports = route