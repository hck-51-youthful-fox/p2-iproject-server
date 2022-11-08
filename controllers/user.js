const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");

class Controller {
  static async register(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      let added = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      if (!added) {
        throw { name: "SequelizeValidationError" };
      }
      const payload = {
        id: added.id,
      };
      const access_token = signToken(payload);
      res.status(201).json({
        username: added.username,
        id: added.id,
        email: added.email,
        access_token,
        role: added.role,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
