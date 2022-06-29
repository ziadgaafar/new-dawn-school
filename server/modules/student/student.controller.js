const studentModel = require("../../DB/models/student.model");
const sendEmail = require("../../common/verification");
const jwt = require("jsonwebtoken");
const HttpError = require("../../common/http-error");
const courseModel = require("../../DB/models/course.Model");
const degreeModel = require("../../DB/models/degree");

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
      var token = jwt.sign({ addStudent }, process.env.TOKEN_KEY, {
        expiresIn: 420,
      });
      const message = `<div style="text-align:center">
      <h1>If You Registed in New Dawn School, please open link below to verify it   was you</h1>
      <a style="border:1px solid grey;padding:8px;border-radius:8px;text-decoration:none" href="${req.protocol}://${req.headers.host}/api/student/confirmation/${token}">click here</a>
    </div>`;
      sendEmail(email, message);
      res.status(200).json({ message: "Applied Successfully" });
    }
  } catch (error) {
    console.log(error);
    return next(new HttpError("Unexpected Error", 500));
  }
};

const confirmRegister = async (req, res) => {
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
      res.status(200).redirect(process.env.CLIENT_URL);
    } else {
      return next(
        new HttpError("Email is already confirmed or not registed", 400)
      );
    }
  } catch (error) {
    res.status(500).json({ Message: "Server Error", error });
  }
};

const showCourses = async (req, res, next) => {
  const check = await courseModel.find({ student: req.user._id });
  if (!check == []) {
    res.status(200).json({ check });
  } else {
    res.status(400).json({ Error: "No Founded Courses" });
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

const studentDegree = async (req, res) => {
  try {
    const { courseID } = req.body;

    const degreeOfStudent = await degreeModel
      .find({ student: req.user._id, course: courseID })
      .populate("student", "firstName lastName")
      .populate("course", "subject")
      .populate("teacher", "firstname lastname")
    if (!degreeOfStudent == []) {
      res.json({ message: "your degree", degreeOfStudent });
    } else {
      res.status(400).json({ Error: "no found degree" });
    }
  } catch (error) {
    res.status(400).json({ Error: "Error" });
  }
};

module.exports = {
  studentRegister,
  confirmRegister,
  showStudentDash,
  showCourses,
  studentDegree,
  showTimeTable,
};
