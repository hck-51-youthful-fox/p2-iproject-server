const { User } = require("../models/index");
const { comparedPassword } = require("../helpers/bcrypt");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;
      const data = await User.create({
        email,
        username,
        password,
      });
      console.log(data);
      res.status(201).json({ id: data.id, email: data.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      console.log("masuk login");
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "bad_request_login" };
      }
      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      console.log(foundUser, "dari controller");

      if (!foundUser) {
        throw { name: "invalid_credentials" };
      }

      const comparePassword = comparedPassword(password, foundUser.password);

      if (foundUser.role !== "User") {
        throw { name: "invalid_log_role" };
      }

      if (!comparePassword) {
        throw { name: "invalid_credentials" };
      }

      const payload = {
        id: foundUser.id,
      };

      const token = createToken(payload);

      res.status(200).json({
        access_token: token,
        email: foundUser.email,
        role: foundUser.role,
        username: foundUser.username,
        id: foundUser.id,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
