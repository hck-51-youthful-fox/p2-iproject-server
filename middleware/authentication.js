const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    console.log(access_token);
    if (!access_token) {
      throw { name: "nggak bisa masuk dong" };
    }
    let payload = verifyToken(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Invalid email or password" };
    }
    req.user = {
      id: user.id,
      email: user.email,
      name: user.username,
      status: user.status,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authentication;
