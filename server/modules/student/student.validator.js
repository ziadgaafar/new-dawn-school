const joi = require("joi");

const validateSignup = {
  body: joi
    .object()
      
    .keys({
      studentOrParent: joi.string()  ,
      firstName: joi.string()  ,
      lastName: joi.string()  ,
      email: joi.string().email()  ,
      phone: joi
        .string()
        .length(11)
        .pattern(/^[0-9]+$/),
      country: joi.string()  ,
      city: joi.string()  ,
      dateOfBirth: joi.string()  ,
      studentLevel: joi.string()  ,
      submitQuestion: joi.string(),
    }),
};

module.exports = validateSignup;
