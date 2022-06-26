const app = require("express").Router();
const {createCourse, deleteCourse, updateCourse} = require("./course.controller");

app.post("/api/course/create", createCourse);
app.delete("/api/course/delete", deleteCourse);
app.put("/api/course/update", updateCourse)

module.exports = app