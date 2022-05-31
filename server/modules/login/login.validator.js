const joi = require("joi");
const { joiPassword } = require("joi-password");

const validateLogin = {
    body:joi.object().required().keys({
        email:joi.string().email().required(),
        password:joiPassword.string().required().min(8)
    })
}

module.exports = validateLogin