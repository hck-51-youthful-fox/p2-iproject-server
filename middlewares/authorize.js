const { Rent } = require("../models");

const authorization = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    let { id } = req.params;
    let payload = verifyToken(access_token);
    let deleted = await Rent.findByPk(id);
    if (!deleted) {
      throw { name: "DATA_NOT_FOUND" };
    }
    if (payload.id != deleted.UserId) {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization
