const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const createToken = (payload) => jwt.sign(payload, SECRET);
const validateToken = (token) => jwt.verify(token, SECRET);

module.exports = { createToken, validateToken };
