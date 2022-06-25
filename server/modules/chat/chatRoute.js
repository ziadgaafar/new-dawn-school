const chatRouter=require("express").Router()
const auth=require("../../midleware/authorizationer")
const{accessChat,fetchChat,createGroupChat,renameGroupChat,addToGroup,removeFromGroup}=require("./controller/chat.controller")

chatRouter.post("/api/chat",auth(),accessChat);
chatRouter.get("/api/chat",auth(),fetchChat)
 chatRouter.post("/api/chat/createGroup",auth(),createGroupChat)
chatRouter.put("/api/chat/renameGroup",auth(),renameGroupChat)
chatRouter.put("/api/chat/groupRemoved/:chatId",auth(),removeFromGroup)
chatRouter.put("/api/chat/groupAdd/:chatId",auth(),addToGroup)





module.exports=chatRouter