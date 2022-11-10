const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");
// let baseUrl = "http://localhost:3000";
let baseUrl = "https://bopflix.herokuapp.com";

class Controller {
  static async register(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      const uniqueStr = signToken(email, process.env.EMAIL_SECRET);
      let added = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        uniqueStr,
        verified: false,
      });
      if (!added) {
        throw { name: "SequelizeValidationError" };
      }
      const sendMail = (email, uniqueStr) => {
        let transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
          },
        });
        let mailOptions;
        let sender = "BopFlixxx";
        mailOptions = {
          from: sender,
          to: email,
          subject: "Confirmation Email",
          html: `Press <a href=${baseUrl}/users/verify/${uniqueStr}> here <a/> to verify your account`,
        };
        transport.sendMail(mailOptions, function (err, res) {
          if (err) {
            console.log(err);
          } else {
            console.log("SENT");
          }
        });
      };
      sendMail(email, uniqueStr);
      res.status(201).json({
        username: added.username,
        id: added.id,
        email: added.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async verify(req, res, next) {
    try {
      let { uniqueStr } = req.params;
      const user = await User.findOne({ where: { uniqueStr } });
      if (user) {
        await User.update({ verified: true }, { where: { uniqueStr } });
      }
      res.status(200).json({ message: "Your account is now verified" });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      let userLogin = await User.findOne({ where: { email } });
      if (!userLogin) {
        throw { name: "invalid_credentials" };
      }
      if (!userLogin.verified) {
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
  static async google(req, res, next) {
    try {
      let { id_token } = req.headers;
      const client = new OAuth2Client(process.env.GOOGLE_ID);
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.given_name,
          email: payload.email,
          password: "google",
          phoneNumber: "021",
          address: "googlecom",
        },
        hooks: false,
      });
      const access_token = createToken({ id: user.id });
      res.status(200).json({
        access_token,
        id: user.id,
        email: user.email,
        username: user.username,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
