const chatModel = require("../../../DB/models/chat.Model");
const studentModel = require(".././../../DB/models/student.model");
const teacherModel = require(".././../../DB/models/teacher.model");
const { HttpError } = require("../../../common/http-error");

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
        res.status(200).json({ result });
      });
  } catch (error) {
    return next(new HttpError("Unexpected Error", 500));
  }
};

// const addToGroup = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const { userId } = req.body;
//     const updateChat = await chatModel
//       .findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
//       .populate("users", "-password")
//       .populate("groupAdmin", "-password");
//     res.status(200).send(updateChat);
//   } catch (error) {
//     return res.status(400).send({ messsage: "Error", error });
//   }
// };
const removeFromGroup = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.body;
    const updateChat = await chatModel
      .findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).send(updateChat);
  } catch (error) {
    return res.status(400).send({ messsage: "Error", error });
  }
};

module.exports = {
  fetchChat,
  removeFromGroup,
};
