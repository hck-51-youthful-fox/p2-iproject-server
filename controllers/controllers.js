const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.googleClientId);

class Controller {
  static async registerUser(req, res, next) {
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
}

module.exports = Controller;
