const imageRoutes=require("express").Router()
const { displayimage } = require("../../common/changeImage");
const auth = require("../../midleware/authorizationer");


imageRoutes.get("/",auth(),displayimage)


module.exports=imageRoutes