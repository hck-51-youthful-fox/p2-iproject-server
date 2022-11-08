const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Note, MyNote } = require("../models");
const main = require("../helpers/nodemailer");

class Controller {
  static async registrasi(req, res, next) {
    try {
      const { username, email, password } = req.body;
      let user = await User.create({
        username,
        email,
        password,
        status: "reguler",
      });
      console.log("test");
      main(email, username);
      res.status(201).json({
        id: user.id,
        email: user.email,
        status: user.status,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { message: "validation is required" };
      const data = await User.findOne({ where: { email } });
      if (!data) {
        throw { name: "User not found" };
      }
      const isPasswordMatch = comparePassword(password, data.password);
      if (!isPasswordMatch) {
        throw { name: "invalid email/password" };
      }
      const token = signToken({
        id: data.dataValues.id,
        username: data.dataValues.username,
        email: data.dataValues.email,
        status: data.dataValues.status,
      });
      res.status(200).json({
        Code: 200,
        access_token: token,
        id: data.dataValues.id,
        status: data.dataValues.status,
        username: data.dataValues.username,
        message: "login success",
      });
    } catch (error) {
      next(error);
    }
  }
  static async payment(req, res, next) {
    try {
      const midtransClient = require("midtrans-client");
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-jqtK2wRjcPQ5ApBRu0UYaNCL",
      });
      let random = Math.random() * 100;
      let parameter = {
        transaction_details: {
          order_id: `YOUR-ORDERID-${random}`,
          gross_amount: 50000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          Username: `${req.user.username}`,
          email: `${req.user.email}`,
        },
      };

      snap.createTransaction(parameter).then((transaction) => {
        let transactionToken = transaction.token;

        res.status(201).json({ transactionToken: transactionToken });
      });
    } catch (error) {
      // console.log(error, "<<< error payment");
      next(error);
    }
  }
  static async premium(req, res, next) {
    try {
      const { id } = req.params;

      await User.update(
        { status: "premium" },
        {
          where: { id },
        }
      );
      res.status(200).json({ message: "status success update" });
    } catch (error) {
      next(error);
    }
  }
  // static async addNewNotes(req, res, next) {
  //   try {
  //     const { title, description, date } = req.body;
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = Controller;
