const mongoose = require("mongoose");

const initcon = ()=> {
    return mongoose.connect(process.env.CON_LINK);
}

module.exports = initcon;