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
        url: "https://api.petfinder.com/v2/animals?sort=random&limit=10",
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
      resp.status(200).json(data.animal);
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
      const data = await RentReview.findAll({
        where: { UserId: id },
        attributes: { exclude: ["updatedAt"] },
      });
      resp.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getReviews(req, resp, next) {
    try {
      const data = await RentReview.findAll({
        where: { rented: false },
        attributes: { exclude: ["updatedAt"] },
      });
      resp.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async rentPet(req, resp, next) {
    try {
      const { access_token } = await getAccess();
      const { id: userId } = req.user;
      const { id: petId } = req.params;
      const { data: pet } = await axios({
        method: "get",
        headers: { Authorization: `Bearer ${access_token}` },
        url: `https://api.petfinder.com/v2/animals/${petId}`,
      });
      let [data, created] = await RentReview.findOrCreate({
        where: {
          PetId: petId,
          rented: true,
          UserId: userId,
          name: pet.animal.name,
          imgUrl: pet.animal.photos[0].medium,
        },
      });
      if (!created) throw { name: "rent_exist" };
      resp.status(201).json({ msg: `You are now renting ${data.name}` });
    } catch (error) {
      next(error);
    }
  }
  static async review(req, resp, next) {
    try {
      const { id } = req.rentReview;
      let { rating, content } = req.body;
      if (!rating) rating = 5;
      if (!content) content = "Im really shy UwU";
      let data = await RentReview.update(
        {
          rented: false,
          rentEnd: new Date(),
          rating,
          content,
        },
        {
          where: {
            id,
          },
        }
      );
      resp.status(200).json({ msg: "Review posted" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
