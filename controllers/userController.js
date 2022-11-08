const { User } = require("../models/index");

class Controller {
  static async registerAndLogin(req, res, next) {
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
      const [user, created] = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
          password,
        },
      });
      
    } catch (error) {
      console.log(error);
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
