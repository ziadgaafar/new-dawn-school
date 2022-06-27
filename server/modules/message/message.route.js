const messageRouter = require("express").Router();
const auth = require("../../midleware/authorizationer");
const {
  sendMessgeController,
  allMessage,
} = require("./controller/messageController");

messageRouter.use(auth());

messageRouter.post("/api/message", sendMessgeController);
messageRouter.get("/api/message/:chatId", allMessage);

module.exports = messageRouter;
