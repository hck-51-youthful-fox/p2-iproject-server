const { User } = require("../models/index");
const { tokenVerif } = require("../helpers/jwt");
const authentication = async (req, resp, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: "invalid_access" };
    const data = tokenVerif(access_token);
    if (!data) throw { name: "invalid_access" };
    const foundUser = await User.findByPk(data.id);
    if (!foundUser) throw { name: "not_found" };
    req.user = { id: data.id, username: data.username };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
