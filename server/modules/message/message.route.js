const messageRouter=require("express").Router()
const auth=require("../../midleware/authorizationer")
const {sendMessgeController,allMessage}=require("./controller/messageController")
 messageRouter.post("/api/message",auth(),sendMessgeController)
 messageRouter.get("/api/message:chatId",auth(),allMessage)


module.exports=messageRouter