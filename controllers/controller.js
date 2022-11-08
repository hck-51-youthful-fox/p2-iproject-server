const { User, RentReview } = require("../models/index");
const { inputStatus } = require("../helpers/bcrypt");
const { getToken, tokenVerif } = require("../helpers/jwt");
const { Op } = require("sequelize");
const { OAuth2Client } = require("google-auth-library");
class Controller {
  static async register(req, resp, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const addUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      resp.status(201).json({
        msg: "Account has been created",
        id: addUser.id,
        username: addUser.username,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, resp, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "user_input_missing" };
      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser) throw { name: "invalid_credential" };
      const status = inputStatus(password, foundUser.password);
      if (!status) throw { name: "invalid_credential" };
      const access_token = getToken({ id: foundUser.id });
      resp.status(200).json({
        access_token,
        email: foundUser.email,
        username: foundUser.username,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
