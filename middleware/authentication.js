const { verify } = require("jsonwebtoken");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "nggak bisa masuk dong" };
    }
    let payload = verify(access_token);
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
