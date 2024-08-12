const mongoose = require("mongoose");
require("dotenv").config();
const dbUserName = process.env.user;
const dbPassword = process.env.password;
const dburl = `mongodb://${dbUserName}:${dbPassword}@mongo:27017`;
const connectDB = async () => {
  await mongoose
    .connect(dburl)
    .then(() => {
      console.log("db connected fine");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = connectDB;
