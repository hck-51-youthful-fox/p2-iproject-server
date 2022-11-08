const { Admin } = require("../models");

class AdminController {
  static async adminRegister(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const createdAdmin = await Admin.create({
        email,
        password,
      });
      res.status(201).json({
        id: createdAdmin.id,
        email: createdAdmin.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AdminController;
