const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.googleClientId);

class Controller {}

module.exports = Controller;
