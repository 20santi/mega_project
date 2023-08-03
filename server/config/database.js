const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.mongoose_url, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("DB connected successfully"))
    .catch((error) => {
        console.log("DB connected essue");
        console.error(error);
        process.exit(1);
    })
}