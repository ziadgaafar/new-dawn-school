const chatModel = require("../../DB/models/chat.Model");
const courseModel = require("../../DB/models/course.Model");
const studentModel = require("../../DB/models/student.model");
const degreeModel = require("../../DB/models/degree");
const messageModel = require("../../DB/models/message.model");
const HttpError = require("../../common/http-error");

const createGroup = async function (name, users, admin) {
  await chatModel({
    chatName: name,
    users: users,
    isGroupChat: true,
    groupAdmin: admin,
  }).save();
};
const uploadDegree = async function (course, student, teacher) {
  await new degreeModel({
    teacher: teacher,
    course: course,
    student: student,
  }).save();
};

const createCourse = async (req, res, next) => {
  try {
    const { subject, grade, year, day, time } = req.body;
    const teacher = req.user;
    const check = await courseModel.find({ subject, grade });
    if (check.length > 0) {
      return next(new HttpError("This course already exists!", 400));
    } else {
      // var student2 =JSON.parse(student)
      const student3 = await studentModel.find({ studentLevel: grade });
      let newCourse = await new courseModel({
        subject,
        grade,
        teacher,
        student: student3,
        progress: 0,
        year,
        day,
        time,
      }).save();
      for (let i = 0; i < student3.length; i++) {
        const element = student3[i];
        uploadDegree(newCourse._id, element, newCourse.teacher);
      }
      await createGroup(subject, [...student3, teacher], teacher);
      res.json({ Message: "Added Successfully" });
    }
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteCourse = async (req, res, next) => {
  const { courseId } = req.body;
  const check = await courseModel.findById({ _id: courseId });
  if (check) {
    await courseModel.deleteOne({ _id: check._id });
    await degreeModel.deleteMany({ course: check._id });
    await chatModel.deleteMany({ chatName: check.subject });
    await messageModel.deleteMany({ chat: check._id });
    res.json({ message: "Deleted Successfully" });
  } else {
    return next(new HttpError("course not found", 404));
  }
};

const updateCourse = async (req, res, next) => {
  const { courseId, teacher } = req.body;
  const check = await courseModel.findById({ _id: courseId });
  if (check) {
    await courseModel.updateOne({ _id: check._id }, { teacher: teacher });
    res.json({ Message: "Updated Successfully" });
  } else {
    return next(new HttpError("course not found", 404));
  }
};

module.exports = { createCourse, deleteCourse, updateCourse };
