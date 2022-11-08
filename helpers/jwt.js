const jwt = require("jsonwebtoken");
const secret = `ELDENRINGGOTY` 


const signToken = (payload) => jwt.sign(payload,secret);
const verifyToken = (token) => jwt.verify(token,secret);

module.exports = {
	signToken,
	verifyToken,
};
