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
  gettAllDegree,
  updateDegree,
  showTimeTable,
} = require("./teacher.controller");
const validateAdding = require("./teacher.validator");
const HttpError = require("../../common/http-error");

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

route.post("/uploadBook", uploadBook);
route.post("/uploadExam", uploadExam);
route.post("/uploadassign", uploadassign);
route.get("/getAllDegree", gettAllDegree);
route.put("/updateDegree", updateDegree);
route.get("/timetable", showTimeTable);

module.exports = route;
