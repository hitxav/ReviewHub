const mongoose = require("mongoose");

require("dotenv").config();

const connectDb = async () => {
  mongoose
    .connect(process.env.DATABASE, {})
    .then(console.log("Database connected!"))
    .catch((err) => console.log(err));
};

module.exports = connectDb;