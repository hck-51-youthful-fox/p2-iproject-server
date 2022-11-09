const jwt = require("jsonwebtoken");

const signToken = (payload) => jwt.sign(payload,process.env.SECRET);
const verifyToken = (token) => jwt.verify(token,process.env.SECRET);

module.exports = {
	signToken,
	verifyToken,
};
