const jwt = require("jsonwebtoken");
const SECRET = "kacau";

const createToken = (payload) => jwt.sign(payload, SECRET);
const validateToken = (token) => jwt.verify(token, SECRET);

module.exports = { createToken, validateToken };
