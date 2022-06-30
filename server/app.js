const express = require("express");
const HttpError = require("./common/http-error");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

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
  messageRouter,
  adminRoutes,
} = require("./routes/allRoutes");
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/contactus", contactRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/course", courseRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/admin", adminRoutes);

// Route not found

app.use((req, res, next) => {
  return next(new HttpError("Route not Found", 404));
});

// //Special Error Handler Middleware
app.use((error, req, res, next) => {
  res
    .status(error.code || 500)
    .json({ message: error.message || "Something went wrong!" });
});

try {
  const port = parseInt(process.env.PORT);
  const server = app.listen(port, async () => {
    await mongoose
      .connect(process.env.CON_LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("DB Connected"));
    console.log(`Running on port ${port} ....`);

    const io = require("socket.io")(server, {
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:3000",
      },
    });

    io.on("connection", (socket) => {
      let user;
      console.log("socket.io connected");

      socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(`${userData.firstName} ${userData.lastName} is connected`);
        user = userData.firstName + " " + userData.lastName;
        socket.emit("connected");
      });

      socket.on("joinChat", (chat) => {
        socket.join(chat);
        console.log(`${user} has joined chat ${chat}`);
      });

      socket.on("newMessage", (newMessage) => {
        let chat = newMessage.chat;

        if (!chat.users) return console.log("No users in this chat");

        chat.users.forEach((userId) => {
          if (userId === newMessage.sender.id) return;
          socket.in(userId).emit("messageRecieved", newMessage);
        });
      });
    });
  });
} catch (err) {
  console.log(err);
}
