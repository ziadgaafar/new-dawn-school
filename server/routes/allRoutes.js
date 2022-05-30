const teacherRoutes = require("../modules/teacher/teacher.routes");
const studentRoutes = require("../modules/student/student.routes");
const loginRoutes = require("../modules/login/login.routes");
const contactRoutes = require("../common/contactUs");

module.exports = {teacherRoutes, studentRoutes, loginRoutes, contactRoutes};