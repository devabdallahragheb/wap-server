const User = require("../model/User");
var bcrypt = require("bcryptjs");
class UserService {
  async createUser(userDTO) {
    var hashedPassword = await bcrypt.hash(userDTO.password, 10);
    userDTO.password = hashedPassword;
    const user = new User(userDTO);
    return await user.save();
  }

  async getAllUsers() {
    return await User.find();
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async updateUSer(id, userDTO) {
    return await User.findByIdAndUpdate(id, { $set: userDTO }, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndRemove(id);
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
module.exports = new UserService();
