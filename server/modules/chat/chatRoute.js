const chatRouter = require("express").Router();
const auth = require("../../midleware/authorizationer");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
} = require("./controller/chat.controller");

chatRouter.use(auth());

chatRouter.post("/api/chat", accessChat);
chatRouter.get("/api/chat", fetchChat);
chatRouter.post("/api/chat/createGroup", createGroupChat);
chatRouter.put("/api/chat/renameGroup", renameGroupChat);
chatRouter.put("/api/chat/groupRemoved/:chatId", removeFromGroup);
chatRouter.put("/api/chat/groupAdd/:chatId", addToGroup);

module.exports = chatRouter;
