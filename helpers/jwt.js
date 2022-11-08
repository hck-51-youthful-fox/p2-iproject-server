const jwt = require("jsonwebtoken");
const SECRET = "RakaZe";

const signToken = (payload) => jwt.sign(payload, SECRET);
const verifyToken = (token) => jwt.verify(payload, SECRET);

module.exports = { signToken, verifyToken };
