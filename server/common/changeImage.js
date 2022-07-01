const teacherModel = require("../DB/models/teacher.model");
const imageModel = require("../DB/models/image.model");
const studentModel = require("../DB/models/student.model");
const HttpError = require("../common/http-error");

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

const displayimage = async (req, res, next) => {
  const foundStudent = await studentModel.findById(req.user._id);
  const foundTeacher = await teacherModel.findById(req.user._id);

  if (!foundStudent && !foundTeacher) {
    return next(new HttpError("User not found", 404));
  }

  if (!!foundStudent) {
    const image = await imageModel.findOne({ userId: req.user._id });
    if (!image) return next(new HttpError("image not found", 404));
    res.json({ message: "done", path: image.filePath });
  } else {
    const image = await imageModel.findOne({ userId: req.user._id });
    if (!image) return next(new HttpError("image not found", 404));
    res.json({ message: "done", path: image.filePath });
  }
};

const imageUpload = async (req, res, next) => {
  try {
    const teacher = await teacherModel.findById(req.user._id);
    await imageModel.findOneAndDelete({ userId: req.user._id });
    const image = new imageModel({
      userId: req.user._id,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2), // 0.00
    });

    if (teacher) {
      const teacher = await teacherModel.findByIdAndUpdate(req.user._id, {
        image: image._id,
      });
      if (!teacher) return next(new HttpError("teacher not found", 404));
    } else {
      const student = await studentModel.findByIdAndUpdate(req.user._id, {
        image: image._id,
      });
      if (!student) return next(new HttpError("student not found", 404));
    }

    await image.save();
    res.json({ message: "updated successfully", path: image.filePath });
  } catch (error) {
    return next(new HttpError("Unexpected Error", 500));
  }
};

module.exports = { imageUpload, displayimage };
