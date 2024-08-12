const User = require("../model/User");
var bcrypt = require("bcryptjs");
class AuthService {
  async signup(userDTO, res, next) {
    try {
      var hashedPassword = await bcrypt.hash(userDTO.password, 10);
      userDTO.password = hashedPassword;
      const user = new User(userDTO);
      const addedUser = await user.save();
      return res.status(201).json("User created successfully!");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async signin(name, password, res, next) {
    try {
      const user = await User.findOne({ name });
      if (!user) {
        throw new Error("User not found");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json("please check your password");
      }
      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = new AuthService();
