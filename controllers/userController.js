const { createToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const mailer = require("../helpers/nodemailer");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      let status = `free`;
      let newRegister = await User.create({
        username,
        email,
        password,
        status,
        phoneNumber,
        address,
      });
      mailer(newRegister.email);
      res.status(201).json({
        msg: "Register successful",
        data: {
          id: newRegister.id,
          username: newRegister.username,
          email: newRegister.email,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const foundUser = await User.findOne({ where: { email } });

      if (!foundUser) throw { name: "Invalid credentials" };

      const comparedPassword = comparePassword(password, foundUser.password);
      if (!comparedPassword) throw { name: "Invalid credentials" };

      let payload = {
        id: foundUser.id,
      };
      const token = createToken(payload);
      res.status(200).json({
        status: foundUser.status,
        username: foundUser.username,
        email: foundUser.email,
        id: foundUser.id,
        access_token: token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async googleSignIn(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const googlePayload = ticket.getPayload();

      const data = await User.findOrCreate({
        where: { email: googlePayload.email },
        defaults: {
          username: googlePayload.name,
          email: googlePayload.email,
          password: "loginWithGoogle",
          status: "free",
        },
        hooks: false,
      });
      let user = data[0];
      let access_token = createToken({
        id: user.id,
      });
      res.status(200).json({
        access_token,
        id: user.id,
        username: user.username,
        status: user.status,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async statusJobs(req, res, next) {
    try {
      let { status } = req.user;
      let id = req.params.id;
      let temp = await User.findByPk(id);
      let data = await User.update(
        {
          status,
        },
        {
          where: { id: req.params.id },
        }
      );
      if (!data) throw { name: "DATA_NOT_FOUND", id };
      let updated = await History.create({
        title: temp.title,
        description: `Job with id ${req.params.id} status updated`,
        updatedBy: req.user.email,
      });
      res.status(200).json({ msg: "Successfull Updated Status", updated });
    } catch (error) {
      //console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
