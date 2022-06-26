const app = require("express").Router();
const {createCourse, deleteCourse, updateCourse,addStudent} = require("./course.controller");

app.post("/api/course/create", createCourse);
app.delete("/api/course/delete", deleteCourse);
app.put("/api/course/update", updateCourse)
app.put("/api/course/addStudent", addStudent)

module.exports = app