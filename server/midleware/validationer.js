const headers = ["body","params"];

const validationer = (schema) => {
    return (req,res,next) => {
        headers.forEach((key) => {
            if (schema[key]) {
                const val = schema[key].validate(req[key]);
                if (val.error) {
                    res.json({Error:val.error.details})
                } else {
                    next();
                }
            }
        });
    }
}
module.exports = validationer