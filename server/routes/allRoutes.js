const teacherRoutes = require("../modules/teacher/teacher.routes");
const studentRoutes = require("../modules/student/student.routes");
const loginRoutes = require("../modules/login/login.routes");
const contactRoutes = require("../common/contactUs");
const chatRouter=require("../modules/chat/chatRoute")
const courseRouter = require("../modules/course/course.routes");
const messageRouter=require("../modules/message/message.route")
const adminRoutes = require("../modules/admin/admin.routes");

module.exports = {courseRouter,
    teacherRoutes, 
    studentRoutes, 
    loginRoutes, 
    contactRoutes,
    chatRouter, 
    messageRouter,
    adminRoutes
};