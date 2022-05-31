const joi =require("joi")

const validateSignup = {
    body:joi.object().required().keys({
        studentOrParents:joi.string().required(),
        firstName:joi.string().required(),
        lastName:joi.string().required(),
        email:joi.string().email().required(),
        phone:joi.string().length(11).pattern(/^[0-9]+$/),
        country:joi.string().required(),
        city:joi.string().required(),
        dateOfBirth:joi.string().required(),
        studentLevel:joi.string().required(),
        studentCurrentSchool:joi.string().required(),
        submitQuestion:joi.string().required(),

    })
}

module.exports= validateSignup