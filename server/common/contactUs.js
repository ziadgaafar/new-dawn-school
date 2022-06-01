const contactModel = require("../DB/models/contact.model");
const route = require("express").Router();

route.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    await new contactModel({ name, email, message }).save();
    res.json({ message: "Done" });
  } catch (error) {
    res.status(500).json({ Message: "Server Error", error });
  }
});

module.exports = route;
