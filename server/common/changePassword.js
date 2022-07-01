const studentModel = require("../DB/models/student.model");
const teacherModel = require("../DB/models/teacher.model");
const HttpError = require("./http-error");

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword, confirmedPassword } = req.body;
  const foundStudent = await studentModel.findOne({
    _id: req.user._id,
    password: oldPassword,
  });
  const foundTeacher = await teacherModel.findOne({
    _id: req.user._id,
    password: oldPassword,
  });
  if (!foundStudent && !foundTeacher) {
    return next(new HttpError("Old Password is incorrect", 401));
  } else {
    if (newPassword == confirmedPassword) {
      if (foundStudent) {
        await studentModel.updateOne(
          { _id: req.user._id },
          { password: newPassword }
        );
        res.json({ message: "Password successfully changed!" });
      } else {
        await teacherModel.updateOne(
          { _id: req.user._id },
          { password: newPassword }
        );
        res.json({ message: "Password successfully changed!" });
      }
    } else {
      return next(
        new HttpError("confirmed password not equal new password", 400)
      );
    }
  }
};
module.exports = changePassword;
