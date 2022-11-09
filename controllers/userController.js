const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models/index");
const axios = require("axios");
const ENCRYPTED_MSK = process.env.ENCRYPTED_MSK;
const midtransUrl = "https://app.sandbox.midtrans.com/snap/v1/transactions";

class Controller {
  static async register(req, res, next) {
    /**
     * Desc: Register & Login user. User memiliki role: basic & subscription. basic bisa hanya bisa add games free2play
     * Butuh:
     * - Sequelize findOrCreate
     * Logic:
     * - after register, user's status akan menjadi basic
     * - after register kalo username null, user's username jadi random string + random integer atau null dulu aja
     * - after register, user's profile pic akan menjadi placeholder
     */
    try {
      const { email, password } = req.body;
      const username = "";
      const status = "basic";
      const profileImgUrl = "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

      const newUser = await User.create({
        email,
        password,
        username,
        status,
        profileImgUrl,
      });

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      //* if email/pass falsy
      if (!email || !password) {
        throw { name: "BAD_REQUEST_LOGIN" };
      }
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });
      //* if user not found
      if (!foundUser) {
        throw { name: "INVALID_CREDENTIALS" };
      }
      //* if user found, but wrong password
      const passwordMatch = comparePassword(password, foundUser.password);
      if (!passwordMatch) {
        throw { name: "INVALID_CREDENTIALS" };
      }
      //* if email & password match
      const payload = {
        id: foundUser.id,
        // email: foundUser.email,
        // username: foundUser.username,
        // status: foundUser.status,
      };
      const access_token = createToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    /**
     * Desc: social media login, ga harus google. kerjain terakhir bgt
     * Butuh:
     * - Google Client-ID
     * - Sequelize findOrCreate
     * - package google (?)
     * Logic:
     * - sama kaya register biasa
     */
  }
  static async nodemailer(req, res, next) {
    /**
     * Desc: Email user setelah register
     * Butuh:
     * - package nodemailer
     */
  }

  // after login
  static async editProfile(req, res, next) {
    /**
     * Desc: Edit profile utk ganti username dan ganti profile picture
     * Butuh:
     * - Sequelize update()
     */
  }

  // feature payment midtrans
  static async subscription(req, res, next) {
    /**
     * Desc: Fitur pembayaran menggunakan midtrans, mengubah status User menjadi subscription
     * Butuh:
     * - Midtrans package
     */
    /**
     * Accept: application/json
      Content-Type: application/json
      Authorization: Basic AUTH_STRING

      https://app.sandbox.midtrans.com/snap/v1/transactions
     */
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${ENCRYPTED_MSK}`,
      },
    };
    const body = {
      transaction_details: {
        order_id: "ORDER-104", // id order // increment
        gross_amount: 10000, // total price
      },
      credit_card: {
        secure: true,
      },
    };
    const { data } = await axios.post(midtransUrl, body, config);
    console.log(data);
    res.status(200).json({ data });
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
