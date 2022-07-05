const studentModel = require("../../DB/models/student.model");
const sendEmail = require("../../common/verification");
const jwt = require("jsonwebtoken");
const HttpError = require("../../common/http-error");
const courseModel = require("../../DB/models/course.Model");
const degreeModel = require("../../DB/models/degree");
const teacherModel = require("../../DB/models/teacher.model");
const chatModel = require("../../DB/models/chat.Model");

const pushStudent = async function (grade, student) {
  const courses = await courseModel.find({grade})
  console.log({courses, grade, student})
  if (courses.length === 0) {
    return;
  } else {
    courses.forEach(async (element) => {
      element.student.push(student);
      await courseModel.findByIdAndUpdate(element._id, {student: element.student})
      await chatModel.findOneAndUpdate({groupAdmin: element.teacher},{users: element.student})
      await new degreeModel({teacher:element.teacher, course:element._id, student:student}).save();
    });
  }
}

const studentRegister = async (req, res, next) => {
  try {
    const {
      studentOrParent,
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      dateOfBirth,
      studentLevel,
      studentCurrentSchool,
      submitQuestion,
    } = req.body;
    const findStudent = await studentModel.findOne({ email });
    if (findStudent) {
      return next(new HttpError("student already register", 400));
    } else {
      const newStudent = new studentModel({
        studentOrParent,
        firstName,
        lastName,
        email,
        phone,
        country,
        city,
        dateOfBirth,
        studentLevel,
        studentCurrentSchool,
        submitQuestion,
      });
      const addStudent = await newStudent.save();
      await pushStudent(newStudent.studentLevel, newStudent._id)
      var token = jwt.sign({ addStudent }, process.env.TOKEN_KEY, {
        expiresIn: 420,
      });
      const message = `<div style="text-align:center">
      <h1>If You Registed in New Dawn School, please open link below to verify it   was you</h1>
      <a style="border:1px solid grey;padding:8px;border-radius:8px;text-decoration:none" href="${req.protocol}://${req.headers.host}/api/student/confirmation/${token}">click here</a>
    </div>`;
      sendEmail(email, message);
      res.json({ message: "Applied Successfully" });
    }
  } catch (error) {
    console.log(error);
    return next(new HttpError("Unexpected Error", 500));
  }
};

const confirmRegister = async (req, res, next) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    email = decoded.addStudent.email;
    const student = await studentModel.findOne(
      { email, isConfirmed: false },
      {}
    );
    if (student) {
      const updateStudent = await studentModel.findByIdAndUpdate(
        { _id: student._id },
        { isConfirmed: true },
        { new: true }
      );

      const message = `
          <div style="text-align:center">
              <h1>You Have Been Accepted To New Dawn School You Can Now Login To Your Account!</h1>
              <h2>Your password: ${updateStudent.password}</h2>
          </div>
      `;
      sendEmail(updateStudent.email, message)

      res.redirect(process.env.CLIENT_URL);
    } else {
      return next(
        new HttpError("Email is already confirmed or not registed", 400)
      );
    }
  } catch (error) {
    console.log(error)
    return next(new HttpError("server error", 500));
  }
};


const showCourses = async (req, res, next) => {
  const check = await courseModel.find({ student: req.user._id });
  if (!check == []) {
    res.json({ check });
  } else {
    return next(new HttpError("courses not found", 404));
  }
};

const showStudentDash = (req, res, next) => {
  console.log("Working");
};
const showTimeTable = async (req, res, next) => {
  const found = await courseModel.find({ student: req.user._id });
  const table = found.map((course) => ({
    subject: course.subject,
    grade: course.grade,
    day: course.day,
    time: course.time,
  }));
  if (found) {
    res.json(table);
  } else {
    return next(new HttpError("Your time table is free", 404));
  }
};

const studentDegree = async (req, res, next) => {
  try {
    const degreeOfStudent = await degreeModel
      .find({ student: req.user._id })
      .populate("student", "firstName lastName")
      .populate("course", "subject")
      .populate("teacher", "firstname lastname");
    if (degreeOfStudent && degreeOfStudent.length > 0) {
      res.json(degreeOfStudent);
    } else {
      return next(new HttpError("Degrees not found!", 404));
    }
  } catch (error) {
    return next(new HttpError("Unexpected Error", 500));
  }
};

const getExam = async (req, res, next) =>{
  const {courseId} = req.body
  const found = await courseModel.findOne({_id:courseId})
  if (found) {
    res.json(found.exam)
  } else {
    return next(new HttpError("course not found", 404));
  }
}
const getCourseAssignment = async (req, res) =>{
  const {courseId} = req.body
  const found = await courseModel.findOne({_id:courseId})
  if (found) {
    res.json(found.assignment)
  } else {
    return next(new HttpError("course not found", 404));
  }
}

module.exports = {
  studentRegister,
  confirmRegister,
  showStudentDash,
  showCourses,
  studentDegree,
  showTimeTable,
  getExam,
  getCourseAssignment,
}

























// if(!req.body.studentId || !req.body.courseId || !req.body.chatId){
//   return next(new HttpError("please fill all fields", 400));
// }
// var student =JSON.parse(req.body.studentId)
// const createStudent=await courseModel.findById(req.body.courseId)
// if (createStudent){
//   for (let i = 0; i < student.length; i++) {
//       const element = student[i];
//       uploadDegree(createStudent._id, element, createStudent.teacher)
//       createStudent.student.push(element)
//   }
//   await courseModel.updateOne({_id:createStudent._id},{student:createStudent.student})
//   await addToChat(req.body.chatId, createStudent.student)
//   res.json("addStudent")
// }else{
//   return next(new HttpError("unexpected error", 500));
// }