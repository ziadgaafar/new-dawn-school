const HttpError = require("../../../common/http-error");
const chatModel = require("../../../DB/models/chat.Model");
const imageModel = require("../../../DB/models/image.model");
const messageModel = require("../../../DB/models/message.model");
const studentModel = require("../../../DB/models/student.model");
const teacherModel = require("../../../DB/models/teacher.model");
// const formatMessage=require("../../../utils/message")

const sendMessgeController = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
      return next(new HttpError("not request", 400));
    } else {
      const GA = await chatModel.findOne({ _id: chatId }).select("groupAdmin");
      const USER = await chatModel.findOne({ _id: chatId }).select("users");
      const admin = GA.groupAdmin;
      const logged = req.user._id;
      var result2;
      const userss = USER.users;
      const check2 = userss;
      var result;
      for (let i = 0; i < check2.length; i++) {
        const sender = check2[i];
        const compare = sender == req.user._id;
        if (compare) {
          result = true;
        } else {
          if (i == check2.length - 1) {
            result = true;
          } else {
            continue;
          }
        }
      }
      if (admin.toString() == logged.toString()) {
        result2 = true;
      } else {
        result2 = true;
      }
      if (result2 == false && result == false) {
        return next(new HttpError("Unauthorized", 401));
      } else {
        const image = await imageModel.findOne({ userId: req.user._id });
        var newMessage = {
          sender: {
            id: req.user._id,
            name:
              (req.user.firstName || req.user.firstname) +
              " " +
              (req.user.lastName || req.user.lastname),
            image: image.filePath,
          },
          content: content,
          chat: chatId,
        };
        const m = await messageModel.create(newMessage);
        await m.populate("chat");
        res.status(200).json(m);
      }
    }
  } catch (error) {
    return next(new HttpError("unexpected error", 500));
  }
};
const allMessage = async (req, res, next) => {
  try {
    const messages = await messageModel
      .find({ chat: req.params.chatId })
      .populate("chat");
    res.json(messages);
  } catch (error) {
    return next(new HttpError("unexpected error", 500));
  }
};

module.exports = { sendMessgeController, allMessage };
