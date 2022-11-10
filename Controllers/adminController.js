const { Admin } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class AdminController {
  static async adminRegister(req, res, next) {
    try {
      const { email, password } = req.body;
      const createdAdmin = await Admin.create({
        email,
        password,
      });
      res.status(201).json({
        id: createdAdmin.id,
        email: createdAdmin.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adminLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({
        where: {
          email,
        },
      });

      if (!admin) {
        throw { name: "Invalid_Credentials" };
      }
      const comparedPassword = comparePassword(password, admin.password);

      if (!comparedPassword) {
        throw { name: "Invalid_Credentials" };
      }
      const payload = {
        id: admin.id,
        role: admin.role,
        username: admin.username,
      };
      const access_token = createToken(payload);

      res.status(200).json({
        access_token,
        id: payload.id,
        role: payload.role,
        username: payload.username,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminController;
