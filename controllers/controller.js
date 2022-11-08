const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Note, MyNote } = require("../models");
const nodemailer = require("../helpers/nodemailer");

class Controller {
  async registrasi(req, res, next) {
    try {
      const { username, email, password } = req.body;
      let user = await User.create({
        username,
        email,
        password,
        status: "reguler",
      });
      nodemailer(email, username);
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
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
      const token = generateToken({
        id: data.dataValues.id,
        username: data.dataValues.username,
        email: data.dataValues.email,
        role: data.dataValues.role,
      });
      res.status(200).json({
        Code: 200,
        access_token: token,
        username: data.dataValues.username,
        role: data.dataValues.role,
        message: "login success",
      });
    } catch (error) {
      next(error);
    }
  }
  async payment(req, res, next) {
    try {
      const midtransClient = require("midtrans-client");
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.SECRET_KEY,
      });
      let random = math.random * 100;
      let parameter = {
        transaction_details: {
          order_id: "YOUR-ORDERID-123456",
          gross_amount: 50000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: "budi",
          last_name: "pratama",
          email: "budi.pra@example.com",
          phone: "08111222333",
        },
      };

      snap.createTransaction(parameter).then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        console.log("transactionToken:", transactionToken);
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
