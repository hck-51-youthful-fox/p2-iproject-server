const { User, RentReview } = require("../models/index");
const { inputStatus } = require("../helpers/bcrypt");
const { getToken, tokenVerif } = require("../helpers/jwt");
const { Op } = require("sequelize");
const getAccess = require("../helpers/access");
const axios = require("axios");
// const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async register(req, resp, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const addUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      resp.status(201).json({
        msg: "Account has been created",
        id: addUser.id,
        username: addUser.username,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, resp, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "user_input_missing" };
      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser) throw { name: "invalid_credential" };
      const status = inputStatus(password, foundUser.password);
      if (!status) throw { name: "invalid_credential" };
      const access_token = getToken({ id: foundUser.id });
      resp.status(200).json({
        access_token,
        email: foundUser.email,
        username: foundUser.username,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getPets(req, resp, next) {
    try {
      const { access_token } = await getAccess();
      const { page, type } = req.query;
      const { data } = await axios({
        method: "get",
        headers: { Authorization: `Bearer ${access_token}` },
        url: "https://api.petfinder.com/v2/animals",
        params: { page, type },
      });
      resp.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getPetDetails(req, resp, next) {
    try {
      const { id } = req.params;
      const { access_token } = await getAccess();
      const { data } = await axios({
        method: "get",
        headers: { Authorization: `Bearer ${access_token}` },
        url: `https://api.petfinder.com/v2/animals/${id}`,
      });
      resp.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getTypes(req, resp, next) {
    try {
      const { access_token } = await getAccess();
      const { data } = await axios({
        method: "get",
        headers: { Authorization: `Bearer ${access_token}` },
        url: `https://api.petfinder.com/v2/types`,
      });
      resp.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getRents(req, resp, next) {
    try {
      const { id } = req.user;
      const data = await RentReview.findAll({ where: { UserId: id } });
      resp.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
