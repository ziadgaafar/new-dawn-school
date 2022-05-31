const jwt = require("jsonwebtoken");
const studentModel = require("../DB/models/student.model");
const teacherModel = require("../DB/models/teacher.model");

const auth = (data) => {
    return async (req,res,next) =>{
        const header = req.headers["authorization"];
        if (header && header.startsWith("Bearer")) {
            const token = header.split(" ")[1];
            const {id} = jwt.verify(token,process.env.TOKEN_KEY);
            const student = await studentModel.findById(id).select("-password");
            const teacher = await teacherModel.findById(id).select("-password");
            if (!student && !teacher) {
                res.status(400).json({Error:"Invalid Token, user not found!!"})
            } else {
                if (student) {
                    req.user = student;
                    if(data.includes(student.role)){
                        next();
                    }else{
                        res.status(400).json({Error:"Not Allowed!!"})
                    }
                } else {
                    req.user = teacher;
                    if(data.includes(teacher.role)){
                        next();
                    }else{
                        res.status(400).json({Error:"Not Allowed!!"})
                    }
                }
            }
        } else {
            res.status(400).json({Error:"Can't Found Token!!"})
        } 
    }

}

module.exports = auth;