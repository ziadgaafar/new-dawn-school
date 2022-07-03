const HttpError = require("../../common/http-error");
const bookModel = require("../../DB/models/book.model");

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

const bookUpload = async (req, res, next) => {
  const courseId = req.query.courseId;
  try {
    await new bookModel({
      courseId: courseId,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2), // 0.00
    }).save();
    res.send("File Uploaded Successfully");
  } catch (error) {
    return next(new HttpError("Unexpected Error", 500));
  }
};

const getBook = async (req, res, next) => {
  const { courseId } = req.query;
  try {
    const files = await bookModel.findOne({ courseId: courseId });
    res.json(files);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const downloadBook = async (req, res, next) => {
  const found = await bookModel.find({ _id: req.params.bookId });
  if (found) {
    let x = __dirname + "../../../" + found[0].filePath;
    res.download(x);
  } else {
    return next(new HttpError("book not found", 404));
  }
};

module.exports = { bookUpload, getBook, downloadBook };
