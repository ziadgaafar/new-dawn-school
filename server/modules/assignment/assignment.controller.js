const HttpError = require("../../common/http-error");
const assignmentModel = require("../../DB/models/assignment.model");

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

const assignUpload = async (req, res, next) => {
  const { courseId } = req.query;
  const studentId = req.user._id;
  try {
    await assignmentModel.findOneAndDelete({ courseId, studentId });
    new assignmentModel({
      courseId,
      studentId,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2), // 0.00
    }).save();
    res.json({ message: "Uploaded Successfully!" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAssign = async (req, res, next) => {
  const { courseId } = req.body;
  try {
    const files = await assignmentModel.find({ courseId: courseId });
    res.json(files);
  } catch (error) {
    return next(new HttpError(error.message, 404));
  }
};

module.exports = { assignUpload, getAssign };
