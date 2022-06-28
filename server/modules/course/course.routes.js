const route = require("express").Router();
const {createCourse, deleteCourse, updateCourse,addStudent} = require("./course.controller");

route.post("/create", createCourse);
route.delete("/delete", deleteCourse);
route.put("/update", updateCourse)
route.put("/add", addStudent)

module.exports = route