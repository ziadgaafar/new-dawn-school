const studentModel = require("../../DB/models/student.model");
const teacherModel = require("../../DB/models/teacher.model");
const jwt = require("jsonwebtoken");
const HttpError = require("../../common/http-error");

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkStudent = await studentModel.findOne({ email });
    if (checkStudent) {
      if (checkStudent.password !== password) {
        return next(new HttpError("Password is incorrect!", 403));
      }
      if (!checkStudent.isConfirmed) {
        return next(new HttpError("Please confirm your E-mail first!", 400));
      }
      const token = jwt.sign({ id: checkStudent._id }, process.env.TOKEN_KEY);
      res.json({ message: "Signed in successfully", token });
    } else {
      const checkTeacher = await teacherModel.findOne({ email });
      if (checkTeacher) {
        if (
          checkTeacher.password == password &&
          checkTeacher.verified == true
        ) {
          const token = jwt.sign(
            { id: checkTeacher._id },
            process.env.TOKEN_KEY
          );
          res.json({ message: "Completed", token });
        } else {
          return next(
            new HttpError(
              "Teacher password is incorrect!! or not verified",
              403
            )
          );
        }
      } else {
        return next(new HttpError("User not found!!", 403));
      }
    }
  } catch (error) {
    return next(new HttpError("Unexpected Error", 500));
  }
};

module.exports = userLogin;
