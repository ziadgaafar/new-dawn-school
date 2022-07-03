const contactModel = require("../DB/models/contact.model");
const HttpError = require("./http-error");
const route = require("express").Router();

route.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    await new contactModel({ name, email, message }).save();
    res.json({ message: "Done" });
  } catch (error) {
    return next(new HttpError("server error in contact", 500));
  }
});

module.exports = route;
