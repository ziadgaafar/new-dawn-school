const jwt = require("jsonwebtoken");
const studentModel = require("../DB/models/student.model");
const teacherModel = require("../DB/models/teacher.model");

const auth = (data) => {
  return async (req, res, next) => {
    let tokenHeader = req.headers["authorization"];
    if (!tokenHeader || !tokenHeader.startsWith("Bearer")) {
      return next(new HttpError("in valid token", 401));
    } else {
      let token = tokenHeader.split(" ")[1];
      let { id } = jwt.verify(token, process.env.TOKEN_KEY);
      let User = await studentModel.findOne({ _id: id }).select("-password");
      let teacher = await teacherModel.findOne({ _id: id }).select("-password");
      if (!User && !teacher) {
        res.status(500).json({ message: "not fouind user" });
      } else {
        if (User) {
          req.user = User;
        } else if (teacher) {
          req.user = teacher;
        }
        next();
      }
    }
  };
};

module.exports = auth;
