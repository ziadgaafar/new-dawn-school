const route = require("express").Router();
const auth = require("../../midleware/authorizationer");
const endPoints = require("../../common/endPoints");
const validationer = require("../../midleware/validationer");
const {upload} = require('../../common/FileSystem');
const { bookUpload, getBook} = require('../book/book.controller');
const {getAssign} = require("../assignment/assignment.controller")
const {
  teacherAddition,
  teacherVerification,
  showTeachertDash,
  uploadExam,
  uploadassign,
  showCourses,
  gettAllDegree,
  updateDegree,
  showTimeTable
} = require("./teacher.controller");
const validateAdding = require("./teacher.validator");

route.post("/addTeacher", validationer(validateAdding), teacherAddition);
route.get("/confirm/:token", teacherVerification);
route.get("/dashboard", auth(endPoints.teacherDash), showTeachertDash);
route.get("/api/course/all", auth(), showCourses)
route.post("/api/corse/uploadExam",auth(),uploadExam)
route.post("/api/corse/uploadassign",auth(),uploadassign)
route.get("/api/course/gettAllDegree",auth(),gettAllDegree)
route.put("/api/course/updateDegree",auth(),updateDegree)
route.get("/timetable", auth(), showTimeTable)
route.post('/uploadBook', upload.single('file'), bookUpload);
route.get('/getBook', getBook);
route.get("/getAssignments", getAssign)

module.exports = route;



