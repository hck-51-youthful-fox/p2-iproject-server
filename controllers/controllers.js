const { User } = require("../models/index");
const { comparedPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.googleClientId);
const nodemailer = require("nodemailer");
const sendMail = require("../helpers/nodemailer");

class Controller {
  static async register(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address, role } = req.body;
      let dataUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        role,
      });
      sendMail(email);

      res.status(201).json({ id: dataUser.id, email: dataUser.email });
    } catch (err) {
      console.log(err);
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

      const comparePassword = comparedPassword(password, foundUser.password);

      if (!comparePassword) {
        throw { name: "invalid_credentials" };
      }

      const payload = {
        id: foundUser.id,
        username: foundUser.username,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token: access_token,
        id: payload.id,
        username: payload.username,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async googleSignIn(req, res, next) {
    let ticket = await client.verifyIdToken({
      idToken: req.headers.google_token,
      audience: process.env.googleClientId,
    });
    let payload = ticket.getPayload();

    let [user, created] = await User.findOrCreate({
      where: {
        email: payload.email,
      },
      defaults: {
        email: payload.email,
        username: payload.given_name,
        password: "ini dari google",
      },
      hooks: false,
    });

    const payloadGoogle = {
      id: user.id,
      role: user.role,
      username: user.username,
    };

    const access_token = createToken(payloadGoogle);

    res.status(200).json({
      access_token: access_token,
      id: user.id,
      username: user.username,
      role: user.role,
    });
  }
}

module.exports = Controller;
