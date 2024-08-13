const User = require("../model/User");
const bcrypt = require("bcryptjs");
class UserService {
  async getAllUsers(req, res, next) {
    return await User.find();
  }

  async getUserById(req, res, next) {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, "You can only update your own account!"));

    return await User.findById(req.params.id);
  }

  async updateUSer(req, res, next) {
    try {
      if (req.user.id !== req.params.id)
        return next(errorHandler(401, "You can only update your own account!"));

      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            photo: req.body.photo,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  async deleteUser(req, res, next) {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, "You can only delete your own account!"));
    try {
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie("access_token");
      res.status(200).json("User has been deleted!");
    } catch (error) {
      next(error);
    }
  }
  async getMyHomes(req, res, next) {
    if (req.user.id === req.params.id) {
      try {
        const homes = await Listing.find({ userRef: req.params.id });
        res.status(200).json(homes);
      } catch (error) {
        next(error);
      }
    } else {
      return next(errorHandler(401, "You can only view your own homes!"));
    }
  }
}
module.exports = new UserService();
