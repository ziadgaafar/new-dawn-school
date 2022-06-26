const joi = require("joi");

const validateAdding = {
    body: joi.object()  .keys({
        email: joi.string().email()  ,
        firstname: joi.string()  ,
        lastname: joi.string()  ,
        courses: joi.string()  ,
        salary: joi.string()  
    })
}

module.exports = validateAdding;