const express = require("express");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT;
app.use("/api/users", userRoute);
app.use("/api/", authRoute);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
connectDB();
app.listen(port, () => {
  console.log("server is runing");
});
