const teacherRoutes = require("../modules/teacher/teacher.routes");
const studentRoutes = require("../modules/student/student.routes");
const loginRoutes = require("../modules/login/login.routes");
const contactRoutes = require("../common/contactUs");
const chatRouter=require("../modules/chat/chatRoute")
const messageRouter=require("../modules/message/message.route")

module.exports = {teacherRoutes, studentRoutes, loginRoutes, contactRoutes,chatRouter,messageRouter};