const User = require("../model/User");
var bcrypt = require("bcryptjs");
const { errorHandler } = require("../utils/error");
require("dotenv").config();
const jwt = require("jsonwebtoken");
class AuthService {
  async signup(userDTO, res, next) {
    try {
      var hashedPassword = await bcrypt.hash(userDTO.password, 10);
      userDTO.password = hashedPassword;
      const user = new User(userDTO);
      await user.save();
      return res.status(201).json("User created successfully!");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async signin(email, password, res, next) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return next(errorHandler(404, "User not found"));
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return next(errorHandler(401, "worng credentioals!"));
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      return res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(rest);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = new AuthService();
