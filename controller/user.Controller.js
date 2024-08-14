const userServices = require("../services/user.services");

exports.getAllUsers = async (req, res, next) => {
  return await userServices.getAllUsers(req, res, next);
};

exports.getUserById = async (req, res, next) => {
  console.log("test");
  
  return await userServices.getUserById(req, res, next);
};

exports.updateUser = async (req, res, next) => {
  return await userServices.updateUSer(req, res, next);
};

exports.deleteUser = async (req, res, next) => {
  return await userServices.deleteUser(req, res, next);
};

exports.getMyHomes = async (req, res, next) => {
  return await userServices.getMyHomes(req, res, next);
};
