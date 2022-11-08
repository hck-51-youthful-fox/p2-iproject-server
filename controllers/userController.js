const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models/index");

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
      console.log(error);
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
        email: foundUser.email,
        username: foundUser.username,
        status: foundUser.status,
      };
      const access_token = createToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
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
  }
}

module.exports = Controller;
