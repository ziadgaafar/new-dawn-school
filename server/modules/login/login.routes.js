const route = require("express").Router();
const userLogin = require("./login.controller");
const validateLogin = require("./login.validator");
const validationer = require("../../midleware/validationer");

route.get("/user/login",validationer(validateLogin),userLogin);

module.exports = route;