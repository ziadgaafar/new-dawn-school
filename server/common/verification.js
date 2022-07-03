const nodemailer = require("nodemailer");

/*
sending verification email using new dawn school official email
*/
const sendEmail = (email, message) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.TRANSPORT_EMAIL,
        pass: process.env.TRANSPORT_PASSWORD,
      },
    });
    transport.sendMail({
      from: `"New Dawn School" <${process.env.TRANSPORT_EMAIL}>`,
      to: email,
      subject: "Verification ✔",
      text: "",
      html: message,
    });
  } catch (error) {
    return next(new HttpError("server error in emails", 500));
  }
};

module.exports = sendEmail;
