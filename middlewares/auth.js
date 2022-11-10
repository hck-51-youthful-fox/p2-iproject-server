const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

async function authentification(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      res.status(401).json({ message: "Invalid token" });
    }
    const payload = verifyToken(access_token);

    const user = await User.findByPk(payload.id);
    if (!user) {
      res.status(401).json({ message: "Invalid token" });
    }

    req.user = {
      id: user.id,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  authentification,
};
