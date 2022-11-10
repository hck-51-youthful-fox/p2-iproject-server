const { verifyToken } = require("../helpers/jwt");
const { User, Game, Library } = require("../models/index");

async function authentication(req, res, next) {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) {
      return res.status(400).json({ message: "Invalid Token" });
      throw { name: "Unauthorized" };
    }
    let payload = verifyToken(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      status: user.status,
    };
    next();
  } catch (error) {
    next(error);
  }
}

async function authorization(req, res, next) {
  try {
    const { status } = req.user;
    const GameId = req.params.id;

    const findGame = await Game.findByPk(GameId);

    if (!findGame) {
      throw { name: "DATA_NOT_FOUND" };
    }

    if (status !== "subscription") {
      throw { name: "Forbidden" };
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authentication, authorization };
