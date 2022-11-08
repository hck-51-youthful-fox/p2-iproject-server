const { comparePassword } = require("../helpers/bcrypt");
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
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      let userLogin = await User.findOne({ where: { email } });
      if (!userLogin) {
        throw { name: "invalid_credentials" };
      }
      let comparedPassword = comparePassword(password, userLogin.password);
      if (!comparedPassword) {
        throw { name: "invalid_credentials" };
      }
      const payload = {
        id: userLogin.id,
      };
      const access_token = signToken(payload);
      res.status(200).json({
        access_token,
        username: userLogin.username,
        email,
        id: userLogin.id,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
