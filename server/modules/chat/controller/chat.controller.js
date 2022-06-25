const chatModel=require("../../../DB/models/chat.Model")
const studentModel=require(".././../../DB/models/student.model")
const teacherModel=require(".././../../DB/models/teacher.model")



const accessChat=async(req,res)=>{
    const {teacherId}=req.body
    if (!teacherId) {
        res.status(400).json({message:"userId not send with request"})
    }else{
        let check=await studentModel.findOne({_id:teacherId})
        let check2=await teacherModel.findOne({_id:teacherId})
        if(!check && !check2){
            res.status(400).json({message:"userID not register"})
        }else{
            var isChat=await chatModel.find({
            isGroupChat:false,
            $and:[
                { users: { $elemMatch: { $eq: req.user._id  } } },
                { users: { $elemMatch: { $eq: teacherId  } } },
                ]
            }).populate("users","-password").populate("latestMessage.contant")
            
            isChat=await studentModel.populate(isChat,{
                path:"latestMessage.sender",
                select:"name email"
            })
            if (isChat.length>0){
                res.send(isChat[0]);
            }else{
                var chatData={
                    chatName:req.user.name,
                    isGroupChat:false,
                    users:[teacherId,req.user._id]
                }
                const createdChat=await chatModel.create(chatData)
                const fullChat=await chatModel.findOne({_id:createdChat._id}).populate("users","-password")
                res.status(200).json({message:"done",fullChat})
            }
        }
    }
}        

const fetchChat=async(req,res)=>{
    try {
        chatModel.find({users:{$elemMatch:{$eq:req.user._id}}}).
        populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(result)=>{
            result=await userModel.populate(result,{
                path:"latestMessage.sender",
                select:"name email"
            })
res.status(200).json({message:"done",result})
        })
    } catch (error) {
        
    }
    
}


const createGroupChat=async(req,res)=>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send({messsage:"please fill all the feilds"})
    }
    var users =JSON.parse(req.body.users)
    if(users.length<2){
        return res.status(400).send({messsage:"more than 2 users"})

    }
    //users.push(req.user)
    try {
        const groupChat=await chatModel.create({
            chatName:req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin:req.user
        })

        const fullGroupChat=await chatModel.findOne({_id:groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password").populate("latestMessage", "content")
                res.status(200).json({message:"createdGroupChat",fullGroupChat})
    } catch (error) {
        return res.status(400).send({messsage:"Error",error})
    }
}

const renameGroupChat=async(req,res)=>{
    const {chatId,chatName}=req.body
    const updateChat=await chatModel.findByIdAndUpdate(chatId,{chatName:chatName}).
    populate("users","-password")
    .populate("groupAdmin","-password")
    res.send(updateChat)
    
}
const addToGroup=async(req,res)=>{
   try {
    const {chatId}=req.params
    const {userId}=req.body
    const updateChat=await chatModel.findByIdAndUpdate(chatId,{$push:{users:userId}},{new:true}).
    populate("users","-password")
    .populate("groupAdmin","-password")
    res.status(200).send(updateChat)
   } catch (error) {
    return res.status(400).send({messsage:"Error",error})
   }
}
const removeFromGroup=async(req,res)=>{
try {
    const {chatId}=req.params
    const {userId}=req.body
    const updateChat=await chatModel.findByIdAndUpdate(chatId,{$pull: { users: userId }},{new:true}).
    populate("users","-password").
    populate("groupAdmin","-password")
    res.status(200).send(updateChat)
} catch (error) {
    return res.status(400).send({messsage:"Error",error})
}
}



module.exports={accessChat,fetchChat,createGroupChat,renameGroupChat,addToGroup,removeFromGroup}