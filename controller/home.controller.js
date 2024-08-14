const homeServices = require("../services/home.services");
exports.createHome = async (req, res, next) => {
  console.log(req.body);

  return await homeServices.createHome(req, res, next);
};

exports.deleteHome = async (req, res, next) => {
  console.log(req.body);

  return await homeServices.deleteHome(req, res, next);
};

exports.getAllHomes = async (req, res, next) => {
  return await homeServices.getAllHomes(req, res, next);
};

exports.getHomeById = async (req, res, next) => {
  console.log(req.body);

  return await homeServices.getHomeById(req, res, next);
};

exports.updateHome = async (req, res, next) => {
  console.log(req.body);

  return await homeServices.updateHome(req, res, next);
};
