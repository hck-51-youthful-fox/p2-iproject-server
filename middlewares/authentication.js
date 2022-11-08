const { User } = require("../models/index");
const { verifyToken } = require("../helpers/jwt");

const authUser = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }
    let payload = verifyToken(access_token);
    if (!access_token) {
      throw { name: "JsonWebTokenError" };
    }
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthorized" };
    }
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authUser;
