const headers = ["body", "params"];
const HttpError = require("../common/http-error");

const validationer = (schema) => {
  return (req, res, next) => {
    headers.forEach((key) => {
      if (schema[key]) {
        const val = schema[key].validate(req[key]);
        if (val.error) {
          return next(new HttpError(val.error.details[0].message, 400));
        } else {
          next();
        }
      }
    });
  };
};
module.exports = validationer;
