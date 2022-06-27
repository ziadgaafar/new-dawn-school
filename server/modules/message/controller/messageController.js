const HttpError = require("../../../common/http-error");
const chatModel = require("../../../DB/models/chat.Model");
const messageModel = require("../../../DB/models/message.model");
const studentModel=require("../../../DB/models/student.model")
const teacherModel=require("../../../DB/models/teacher.model")
// const formatMessage=require("../../../utils/message")

const sendMessgeController = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    return res.status(400).send("not request");
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
    //const ffind = check2.filter(req.user._id)
    if (result2 == false && result == false) {
      res.json({ Error: "errorrrrrrrrrrrrrrrrrr" });
    } else {
      var newMessage = {
        sender: {id:req.user._id,
        name: req.user.firstName + " " +req.user.lastName,
        image: "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
      },
        content: content,
        chat: chatId,
      };
      //try {

      var message = await messageModel.create(newMessage);
      // message = await message.populate("sender", "name email");
      // message = await message.populate("chat");
      // message=await userModel.populate(message,{
      //     path:"chat.users",
      //     select:"name "
      // })
      // message = await chatModel.populate(message, {
      //   path: "users",
      //   select: "name ",
      // });
      // await chatModel.findByIdAndUpdate(req.body.chatId, {
      //   latestMessage: message,
      // });

      res.json(message);
      // } catch (error) {

      // }
    }
  }
};
const allMessage = async (req, res, next) => {
  try {
    const messages = await messageModel
      .find({ chat: req.params.chatId })
    // let user = await studentModel.findOne({_id:message.sender});
    // if(user){
    //   res.json({user})
    // } else{
    //   user = await teacherModel.findOne({_id:message.sender});
    //   if (user) {
    //     res.json({user})
    //   } else {
    //     res.json({Error:"error"})
    //   }
    // }
    res.json(messages);
  } catch (error) {
    return next(new HttpError("unexpected error", 500));
  }
};

module.exports = { sendMessgeController, allMessage };
