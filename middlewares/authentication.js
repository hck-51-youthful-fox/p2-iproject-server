const { User } = require("../models/");
const { validateToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw { name: "cant access token" };

    let payload = validateToken(access_token);
    let user = await User.findByPk(payload.id);

    if (!user) throw { name: "cant access token" };
    req.user = {
      id: user.id,
      email: user.email,
      name: user.username,
      status: user.status,
    };
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = authentication;
