const route = require("express").Router();
const {
  createCourse,
  deleteCourse,
  updateCourse,
} = require("./course.controller");
const auth = require("../../midleware/authorizationer");

route.use(auth());

route.use((req, res, next) => {
  if (req.user.role !== "teacher") {
    return next(new HttpError("Unauthorized", 401));
  }
  next();
});

route.post("/create", createCourse);
route.delete("/delete", deleteCourse);
route.put("/update", updateCourse);

module.exports = route;
