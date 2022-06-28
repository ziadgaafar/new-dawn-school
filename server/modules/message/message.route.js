const messageRouter = require("express").Router();
const auth = require("../../midleware/authorizationer");
const {
  sendMessgeController,
  allMessage,
} = require("./controller/messageController");

messageRouter.use(auth());

messageRouter.post("/", sendMessgeController);
messageRouter.get("/:chatId", allMessage);

module.exports = messageRouter;
