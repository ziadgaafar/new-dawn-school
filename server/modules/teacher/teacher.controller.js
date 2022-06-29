const teacherModel = require("../../DB/models/teacher.model");
const courseModel = require("../../DB/models/course.Model");
const sendEmail = require("../../common/verification");
const jwt = require("jsonwebtoken");
const degreeModel = require("../../DB/models/degree");
const HttpError = require("../../common/http-error");

const teacherAddition = async (req, res, next) => {
  try {
    const { email, firstname, lastname, courses, salary } = req.body;
    const found = await teacherModel.findOne({ email });
    if (found) {
      res.status(400).json({ Error: "User Already Registed!" });
    } else {
      const added = await new teacherModel({
        email,
        firstname,
        lastname,
        courses,
        salary,
      }).save();
      const token = jwt.sign({ added }, process.env.TOKEN_KEY, {
        expiresIn: 420,
      });
      const mes = `<h1>If You Registed in New Dawn School, please open link below to verify it was you</h1>
            <a href="${req.protocol}://${req.headers.host}/teacher/confirm/${token}">click here</a>`;
      await sendEmail(email, mes);
      res.json({ message: "Added Successfully" });
    }
  } catch (error) {
    res.status(500).json({ Message: "Server Error", error });
  }
};

const teacherVerification = async (req, res, next) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const email = decoded.added.email;
    const check = await teacherModel.findOne({ email: email });
    if (check) {
      if (check.verified) {
        res.json({ Error: "User Already Verified!" });
      } else {
        await teacherModel.findByIdAndUpdate(
          check._id,
          { verified: true },
          { new: true }
        );
        res.json({ message: "Updated Successfully" });
      }
    } else {
      res.status(400).json({ Error: "User Not Registed!" });
    }
  } catch (error) {
    res.status(500).json({ Message: "Server Error", error });
  }
};
const showTeachertDash = () => {
  console.log("working teacher");
};
const showTimeTable = async (req, res, next) => {
  const { userId } = req.user._id;
  const found = await courseModel.findById(userId);
  if (find) {
    res.status(200).json({
      subject: found.subject,
      grade: found.grade,
      day: found.day,
      time: found.time,
    });
  } else {
    res.status(400).json({ Error: "Your time table is free" });
  }
};

const showCourses = async (req, res, next) => {
  const check = await courseModel.find({ teacher: req.user._id });
  if (!check == []) {
    res.status(200).json({ check });
  } else {
    res.status(400).json({ Error: "No Founded Courses" });
  }
};

const uploadExam = async (req, res) => {
  const { grade, exam } = req.body;
  const check = await courseModel.find({ teacher: req.user._id, grade: grade });
  if (check) {
    await courseModel.updateOne({ _id: check[0]._id }, { exam: exam });
    res.status(200).json({ Message: "Updated Successfully" });
  } else {
    res.status(400).json({ Error: "course not found" });
  }
};

const uploadassign = async (req, res) => {
  const { grade, assign } = req.body;
  const check = await courseModel.find({ teacher: req.user._id, grade: grade });
  console.log(check);
  if (check) {
    console.log(check._id);
    await courseModel.updateOne({ _id: check[0]._id }, { assignment: assign });
    res.status(200).json({ Message: "Updated Successfully" });
  } else {
    res.status(400).json({ Error: "course not found" });
  }
};

const gettAllDegree = async (req, res, next) => {
  try {
    const getDegree = await degreeModel
      .find({ teacher: req.user._id })
      .populate("course", "subject")
      .populate("student", "firstName lastName");
    if (getDegree) {
      res.json(getDegree);
    } else {
      return next(new HttpError("No Degrees Found!", 404));
    }
  } catch (error) {
    return next(new HttpError("Unexpected Error!", 500));
  }
};

const updateDegree = async (req, res) => {
  try {
    const { degreeExam, degreeAssign, degreeAttend, courseId, studentId } =
      req.body;
    const createDegree = await degreeModel.updateOne(
      { course: courseId, student: studentId },
      {
        degreeExam,
        degreeAssign,
        degreeAttend,
        totalDegree: +degreeAssign + +degreeAttend + +degreeExam,
      }
    );
    res.json({ message: "Updated successfully", updatedDegree: createDegree });
  } catch (error) {
    return next(new HttpError("Unexpected Error", 500));
  }
};

module.exports = {
  teacherAddition,
  teacherVerification,
  showTeachertDash,
  showCourses,
  uploadExam,
  uploadassign,
  gettAllDegree,
  updateDegree,
  showTimeTable,
};
