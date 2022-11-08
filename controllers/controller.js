const { User, RentReview } = require("../models/index");
const { inputStatus } = require("../helpers/bcrypt");
const { getToken, tokenVerif } = require("../helpers/jwt");
const { Op } = require("sequelize");
const { OAuth2Client } = require("google-auth-library");
class Controller {}

module.exports = Controller;
