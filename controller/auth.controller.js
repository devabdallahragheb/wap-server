const authServices = require("../services/auth.services");
exports.signUp = async (req, res, next) => {
  console.log(req.body);

  return await authServices.signup(req.body, res, next);
};

exports.signin = async (req, res, next) => {
  return await authServices.signin(
    req.body.email,
    req.body.password,
    res,
    next
  );
};
exports.google = async (req, res, next) => {
  return await authServices.google(req, res, next);
};
