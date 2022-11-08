const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Customer } = require("../models");

class CustomerController {
  static async customerRegister(req, res, next) {
    try {
      const { name, email, password, phoneNumber, address } = req.body;
      const customer = await Customer.create({
        name,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: customer.id,
        email: customer.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async customerLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "Invalid_Credentials" };
      }
      if (!password) {
        throw { name: "Invalid_Credentials" };
      }

      const foundCustomer = await Customer.findOne({
        where: {
          email,
        },
      });

      if (!foundCustomer) {
        throw { name: "Invalid_Credentials" };
      }
      const comparedPassword = comparePassword(
        password,
        foundCustomer.password
      );

      if (!comparedPassword) {
        throw { name: "Invalid_Credentials" };
      }
      const payload = {
        id: foundCustomer.id,
        role: foundCustomer.role,
        username: foundCustomer.username,
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

module.exports = CustomerController;
