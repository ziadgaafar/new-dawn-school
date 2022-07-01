const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
  },
  { timestamps: true }
);

const bookModel = mongoose.model("book", bookSchema);
module.exports = bookModel;
