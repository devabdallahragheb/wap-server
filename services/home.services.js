const Home = require("../model/home");
const bcrypt = require("bcryptjs");
class HomeService {
  async createHome(req, res, next) {
    try {
      const home = await Home.create(req.body);
      return res.status(201).json(home);
    } catch (error) {
      next(error);
    }
  }
  async getAllHomes(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;

      if (offer === undefined || offer === "false") {
        offer = { $in: [false, true] };
      }

      let furnished = req.query.furnished;

      if (furnished === undefined || furnished === "false") {
        furnished = { $in: [false, true] };
      }

      let parking = req.query.parking;

      if (parking === undefined || parking === "false") {
        parking = { $in: [false, true] };
      }

      let type = req.query.type;

      if (type === undefined || type === "all") {
        type = { $in: ["sale", "rent"] };
      }

      const searchTerm = req.query.searchTerm || "";

      const sort = req.query.sort || "createdAt";

      const order = req.query.order || "desc";

      const homes = await Home.find({
        name: { $regex: searchTerm, $options: "i" },
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);

      return res.status(200).json(homes);
    } catch (error) {
      next(error);
    }
  }

  async getHomeById(req, res, next) {
    try {
      const home = await Home.findById(req.params.id);
      if (!home) {
        return next(errorHandler(404, "home not found!"));
      }
      res.status(200).json(home);
    } catch (error) {
      next(error);
    }
  }

  async updateHome(req, res, next) {
    const home = await Home.findById(req.params.id);
    if (!home) {
      return next(errorHandler(404, "home not found!"));
    }
    if (req.user.id !== home.userRef) {
      return next(errorHandler(401, "You can only update your own homes!"));
    }

    try {
      const updatedhome = await Home.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedHome);
    } catch (error) {
      next(error);
    }
  }

  async deleteHome(req, res, next) {
    const home = await Home.findById(req.params.id);

    if (!home) {
      return next(errorHandler(404, "home not found!"));
    }

    if (req.user.id !== home.userRef) {
      return next(errorHandler(401, "You can only delete your own homes!"));
    }

    try {
      await Home.findByIdAndDelete(req.params.id);
      res.status(200).json("home has been deleted!");
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new HomeService();
