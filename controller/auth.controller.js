const userServices = require("../services/user.services");
import { errorHandler } from '../utils/error.js';
exports.signUp = async (req, res) => {
  try {
    const user = await userServices.createUser(req.body);
    res.status(201).json(" user created successfully");
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res) => {
  try {
    console.log(req.body.name, req.body.password);

    const user = await userServices.login(req.body.name, req.body.password);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};
 