const User = require("../model/User");
var bcrypt = require("bcryptjs");
class UserService {
  async createUser(userDTO) {
    var hashedPassword = await bcrypt.hash(userDTO.password, 10);
    userDTO.password = hashedPassword;
    const user = new User(userDTO);
    try {
      return await user.save();
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  async getAllUsers() {
    return await User.find();
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async updateUSer(id, userDTO) {
    try {
      return await User.findByIdAndUpdate(id, { $set: userDTO }, { new: true });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  async deleteUser(id) {
    try {
      return await User.findByIdAndRemove(id);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
}
module.exports = new UserService();
