const express = require("express");
const HttpError = require("./common/http-error");
const env = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//All Routes required here
/* Student Routes  ====> {/api/student/Register ==> for student signup} + {/api/student/dashboard ==> for student dashboard}
   Teacher Routes  ====> {/api/teacher/addTeacher ==> for teacher signup} + {/api/teacher/dashboard ==> for teacher dashboard}
   Login Route     ====> {/api/user/login ==> for login}
   Contact Route   ====> {/api/contactus ==> for contacting}
*/
const {
  courseRouter,
  teacherRoutes,
  studentRoutes,
  loginRoutes,
  contactRoutes,
  chatRouter,
  bookRouter,
  messageRouter
} = require("./routes/allRoutes");
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/contactus", contactRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(courseRouter)
app.use(chatRouter)
app.use(bookRouter);
app.use(messageRouter)

// Route not found

app.use((req, res, next) => {
  return next(new HttpError("Route not Found", 404));
});

//Special Error Handler Middleware
app.use((error, req, res, next) => {
  res
    .status(error.code || 500)
    .json({ message: error.message || "Something went wrong!" });
});

mongoose
  .connect(process.env.CON_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    port = parseInt(process.env.PORT);
    app.listen(port, () => {
      console.log(`Running on port ${port} ....`);
    });
  })
  .catch((err) => console.log(err));
