const route = require("express").Router();
const {createCourse, deleteCourse, updateCourse} = require("./course.controller");

route.post("/create", createCourse);
route.delete("/delete", deleteCourse);
route.put("/update", updateCourse)

module.exports = route