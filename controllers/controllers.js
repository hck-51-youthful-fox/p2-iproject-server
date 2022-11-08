const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.googleClientId);

class Controller {
  static async register(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      let dataUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({ id: dataUser.id, email: dataUser.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!foundUser) {
        throw { name: "invalid_credentials" };
      }

      const comparedPassword = comparePassword(password, foundUser.password);

      if (!comparedPassword) {
        throw { name: "invalid_credentials" };
      }

      const payload = {
        id: foundUser.id,
        username: foundUser.username,
      };

      const access_token = createToken(payload);

      res.status(200).json({
        access_token: access_token,
        id: payload.id,
        username: payload.username,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
