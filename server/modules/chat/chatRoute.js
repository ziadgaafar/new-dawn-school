const chatRouter = require("express").Router();
const auth = require("../../midleware/authorizationer");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroupChat,
  removeFromGroup,
} = require("./controller/chat.controller");

chatRouter.use(auth());

chatRouter.get("/api/chat", fetchChat);
chatRouter.put("/api/chat/groupRemoved/:chatId", removeFromGroup);

module.exports = chatRouter;
