const joi = require("joi");

const validateAdding = {
    body: joi.object().required().keys({
        email: joi.string().email().required(),
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        courses: joi.string().required(),
        salary: joi.string().required()
    })
}

module.exports = validateAdding;