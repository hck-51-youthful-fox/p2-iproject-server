const { User, Product } = require("../models/index");
const { comparedPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.googleClientId);
const nodemailer = require("nodemailer");
const sendMail = require("../helpers/nodemailer");
var ImageKit = require("imagekit");
const fs = require("fs");
const midtransClient = require("midtrans-client");

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
        role: `customer`,
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

    const access_token = signToken(payloadGoogle);

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

      const imagekit = new ImageKit({
        publicKey: "public_MOW2oPu6MEH1AlsNJdVkcC4QIa8=",
        privateKey: "private_toUdZafHox3VwvJ3ZJ60FGuHwek=",
        urlEndpoint: "https://ik.imagekit.io/rakaze",
      });
      const image = await imagekit.upload({
        file: req.file.buffer, //required
        fileName: req.file.originalname, //required
      });

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

  static async productList(req, res, next) {
    try {
      const query = {};
      let limit = 8;
      let offset;

      const paging = (data, page, limit) => {
        const { count: totalProduct, rows: rows } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalProduct / limit);

        return { totalProduct, rows, totalPages, currentPage };
      };

      const { page } = req.query;

      if (page !== "" && typeof page !== "undefined") {
        offset = page * limit - limit;
        query.offset = offset;
        query.limit = limit;
      } else {
        limit = 8;
        offset = 0;
        query.offset = offset;
        query.limit = limit;
      }

      let dataProduct = await Product.findAndCountAll(query);
      res.status(200).json(paging(dataProduct, page, limit));
    } catch (err) {
      next(err);
    }
  }

  static async midtransTransaction(req, res, next) {
    let { id } = req.params;
    let foundProduct = await Product.findByPk(id);

    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: "SB-Mid-server-vIob-_je6hTfGgkzW4kGL5Ho",
    });

    let parameter = {
      transaction_details: {
        order_id: Math.random(1000),
        gross_amount: foundProduct.price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: req.user.username,
        email: req.user.email,
        phone: req.user.phoneNumber,
      },
    };

    snap.createTransaction(parameter).then((transaction) => {
      // transaction token
      let transactionToken = transaction.token;
      let transactionUrl = transaction.redirect_url;
      res.status(200).json({
        transactionToken: transactionToken,
        transactionUrl: transactionUrl,
      });
    });
  }

  static async updateProductStatus(req, res, next) {
    try {
      let { id } = req.params;
      let { status } = req.body;
      let searchData = await Product.findByPk(id);
      let dataProduct = await Product.update(
        { status },
        {
          where: {
            id: `${id}`,
          },
        }
      );
      res.status(201).json({
        message: `Product ${id} Sold`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
