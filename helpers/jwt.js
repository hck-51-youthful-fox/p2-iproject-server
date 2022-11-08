const jwt = require("jsonwebtoken");

const createToken = (payload) => jwt.sign(payload, "HAI");
const verifyToken = (token) => jwt.verify(token, "HAI");

module.exports = { createToken, verifyToken };
