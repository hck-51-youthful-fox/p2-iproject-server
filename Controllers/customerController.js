const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Customer } = require("../models");
const nodemailer = require("nodemailer");

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
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "makans.indonesia@gmail.com", // generated ethereal user
          pass: "qwclinozklvecqix", // generated ethereal password
        },
      });

      const msg = {
        from: '"Makans" <makans.indonesia@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Selamat datang di Makans!", // Subject line
        text: "Terima kasih telah mendaftar akun di Makans. Ayo pesan makanan keinginanmu sekarang!", // plain text body
        // html: "<b>Hello world?</b>", // html body
      };
      // send mail with defined transport object
      const info = await transporter.sendMail(msg);

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
      // console.log(error);
      next(error);
    }
  }
}

module.exports = CustomerController;
