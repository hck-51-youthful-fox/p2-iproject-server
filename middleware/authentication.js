const { verifyToken } = require("../helpers/jwt");
const { Admin, Customer } = require("../models");

async function authAdmin(req, res, next) {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }
    let payload = verifyToken(access_token);
    let admin = await Admin.findByPk(payload.id);

    if (!admin) {
      throw { name: "Unauthorized" };
    }
    req.admin = {
      id: admin.id,
      email: admin.email,
    };
    next();
  } catch (error) {
    next(error);
  }
}
async function authCustomer(req, res, next) {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }
    let payload = verifyToken(access_token);
    let customer = await Customer.findByPk(payload.id);

    if (!customer) {
      throw { name: "Unauthorized" };
    }
    req.customer = {
      id: customer.id,
      email: customer.email,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authAdmin, authCustomer };
