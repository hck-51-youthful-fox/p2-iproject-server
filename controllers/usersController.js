const { validatePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require(`../models`);
const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async userRegister(req, res, next) {
    try {
      const { username, email, password } = req.body;
      let newUser = await User.create({
        username,
        email,
        password,
        verified: false,
      });

      res.status(201).json({
        msg: `User created successfully.`,
        data: {
          id: newUser.id,
          email: newUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = Controller;