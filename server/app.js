const express = require("express");
const app = express();
app.use(express.json());
const env = require("dotenv").config();

//DB connection
const initcon = require("./DB/connection");
initcon();

//All Routes required here
/* Student Routes  ====> {/student/Register ==> for student signup} + {/student/dashboard ==> for student dashboard}
   Teacher Routes  ====> {/teacher/addTeacher ==> for teacher signup} + {/teacher/dashboard ==> for teacher dashboard}
   Login Route     ====> {/user/login ==> for login}
   Contact Route   ====> {/contactus ==> for contacting}
*/
const {teacherRoutes, studentRoutes, loginRoutes, contactRoutes} = require("./routes/allRoutes");
app.use(teacherRoutes);
app.use(studentRoutes);
app.use(loginRoutes);
app.use(contactRoutes);


port = parseInt(process.env.PORT);
app.listen(port,()=>{console.log(`Running ....`);});


