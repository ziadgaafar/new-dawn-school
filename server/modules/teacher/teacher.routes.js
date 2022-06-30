const route = require("express").Router();
const auth = require("../../midleware/authorizationer");
const endPoints = require("../../common/endPoints");
const validationer = require("../../midleware/validationer");
const { upload } = require("../../common/FileSystem");
const { bookUpload, getBook } = require("../book/book.controller");
const { getAssign } = require("../assignment/assignment.controller");


const {
  teacherAddition,
  teacherVerification,
  showTeachertDash,
  uploadExam,
  uploadassign,
  showCourses,
  gettAllDegree,
  updateDegree,
  showTimeTable,
} = require("./teacher.controller");
const validateAdding = require("./teacher.validator");
const HttpError = require("../../common/http-error");
const changePassword = require("../../common/changePassword");
const imageUpload = require("../../common/changeImage");

route.post("/addTeacher", validationer(validateAdding), teacherAddition);
route.get("/confirm/:token", teacherVerification);
route.get("/dashboard", auth(endPoints.teacherDash), showTeachertDash);
route.get("/api/course/all", auth(), showCourses);

route.use(auth());

route.use((req, res, next) => {
  if (req.user.role !== "teacher") {
    return next(new HttpError("Unauthorized", 401));
  }
  next();
});

route.post("/uploadExam", uploadExam);
route.post("/uploadassign", uploadassign);
route.get("/getAllDegree", gettAllDegree);
route.put("/updateDegree", updateDegree);
route.get("/timetable", showTimeTable);
route.post("/uploadBook", upload.single("file"), bookUpload);
route.get("/getBook", getBook);
route.get("/getAssignments", getAssign);
route.put("/changePassword",auth(),changePassword) 
route.post("/imageUpload",auth(),upload.single('file'),imageUpload) 


module.exports = route;
