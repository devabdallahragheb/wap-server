const User = require("../model/User");
var bcrypt = require("bcryptjs");
class AuthService {
  async createUser(userDTO) {
    var hashedPassword = await bcrypt.hash(userDTO.password, 10);
    userDTO.password = hashedPassword;
    const user = new User(userDTO);
    return await user.save();
  }

  async login(name, password) {
    const user = await User.findOne({ name });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    }
    return user;
  }
}
module.exports = new AuthService();
