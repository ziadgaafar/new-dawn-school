const chatModel = require("../../../DB/models/chat.Model");
const studentModel = require(".././../../DB/models/student.model");
const teacherModel = require(".././../../DB/models/teacher.model");
const HttpError = require("../../../common/http-error");

const fetchChat = async (req, res) => {
  try {
    chatModel
      .find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await studentModel.populate(result, {
          path: "latestMessage.sender",
          select: "name email",
        });
        res.json({ result });
      });
  } catch (error) {
    return next(new HttpError("Unexpected Error", 500));
  }
};

const removeFromGroup = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.body;
    const updateChat = await chatModel
      .findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.send(updateChat);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

module.exports = {
  fetchChat,
  removeFromGroup,
};
