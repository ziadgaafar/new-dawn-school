const route = require("express").Router();
const auth = require("../../midleware/authorizationer");
const endPoints = require("../../common/endPoints");
const validationer = require("../../midleware/validationer");
const {
  teacherAddition,
  teacherVerification,
  showTeachertDash,
  uploadBook,
  uploadExam,
  uploadassign,
  showCourses,
  uploadDegree,
  gettAllDegree,
  updateDegree
} = require("./teacher.controller");
const validateAdding = require("./teacher.validator");

route.post("/addTeacher", validationer(validateAdding), teacherAddition);
route.get("/confirm/:token", teacherVerification);
route.get("/dashboard", auth(endPoints.teacherDash), showTeachertDash);
route.get("/api/course/all", auth(), showCourses)
route.post("/api/corse/uploadBook",auth(),uploadBook)
route.post("/api/corse/uploadExam",auth(),uploadExam)
route.post("/api/corse/uploadassign",auth(),uploadassign)
route.post("/api/course/uploadDegree",auth(),uploadDegree)
route.get("/api/course/gettAllDegree",auth(),gettAllDegree)
route.put("/api/course/updateDegree",auth(),updateDegree)

module.exports = route;
