const express = require("express");
const userRoute = require("./routes/userRoute");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT;
app.use("/api/users", userRoute);
connectDB();
app.listen(port, () => {
  console.log("server is runing");
});
