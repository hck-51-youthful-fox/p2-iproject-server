const jwt = require("jsonwebtoken");

const signToken = (payload) => jwt.sign(payload);
const verifyToken = (token) => jwt.verify(token);

module.exports = {
	signToken,
	verifyToken,
};
