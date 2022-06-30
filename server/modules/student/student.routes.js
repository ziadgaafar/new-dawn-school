const route = require("express").Router();

const auth=require("../../midleware/authorizationer")
const {getBook, downloadBook} = require('../book/book.controller');
const { assignUpload} = require("../assignment/assignment.controller")
const {upload} = require("../../common/FileSystem")
//controllers call
const {
  studentRegister,
  confirmRegister,
  showStudentDash,
  showCourses,
  studentDegree,
  showTimeTable,
  getExam,
  getCourseAssignment,
  
} = require("./student.controller");
//validation call
const validationer = require("../../midleware/validationer");
const validateSignup = require("./student.validator");
//authorization call
const authorizationer = require("../../midleware/authorizationer");
const endPoints = require("../../common/endPoints");
const changePassword = require("../../common/changePassword");
const imageUpload = require("../../common/changeImage");

route.post("/register", validationer(validateSignup), studentRegister);
route.get("/confirmation/:token", confirmRegister);
route.get(
  "/dashboard",
  authorizationer(endPoints.studentDash),
  showStudentDash
);
route.get("/course/all", authorizationer(), showCourses)
route.get("/degree",auth(),studentDegree)
route.get("/timetable", authorizationer(), showTimeTable)
route.get('/getBook', getBook);
route.post("/uploadAssignment", auth(), upload.single('file'), assignUpload)
route.get("/downloadBook/:bookId", downloadBook)
route.get("/getExam", getExam)
route.get("/getCourseAssignment", getCourseAssignment) 
route.put("/changePassword",auth(),changePassword)
route.post("/imageUpload",auth(),upload.single('file'),imageUpload)  

module.exports = route;