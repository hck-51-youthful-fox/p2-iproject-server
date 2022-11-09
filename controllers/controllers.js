const { User, Product } = require("../models/index");
const { comparedPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.googleClientId);
const nodemailer = require("nodemailer");
const sendMail = require("../helpers/nodemailer");
var ImageKit = require("imagekit");
const fs = require("fs");

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
      sendMail(email, username);

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

  static async addProduct(req, res, next) {
    try {
      let { name, description, price } = req.body;
      console.log(req.file);

      const imagekit = new ImageKit({
        publicKey: "public_MOW2oPu6MEH1AlsNJdVkcC4QIa8=",
        privateKey: "private_toUdZafHox3VwvJ3ZJ60FGuHwek=",
        urlEndpoint: "https://ik.imagekit.io/rakaze",
      });
      const image = await imagekit.upload({
        file: req.file.buffer, //required
        fileName: req.file.originalname, //required
      });

      console.log(req.file);
      let product = await Product.create({
        name,
        img: image.url,
        description,
        price,
      });
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
