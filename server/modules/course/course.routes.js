const route = require("express").Router();
const {createCourse, deleteCourse, updateCourse,addStudent} = require("./course.controller");

route.post("/api/course/create", createCourse);
route.delete("/api/course/delete", deleteCourse);
route.put("/api/course/update", updateCourse)
route.put("/api/course/add", addStudent)

module.exports = route