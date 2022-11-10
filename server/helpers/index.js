const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const SECRET = "MEONG"
const SECRET = process.env.SECRET

// to hash a password
const salt = bcrypt.genSaltSync(10)

const hashPassword = (password) => bcrypt.hashSync(password, salt)

// to check a password
const comparePassword = (password, hashedPass) => bcrypt.compareSync(password, hashedPass) // return boolean

//create token (if authorized)
const createToken = (payload) => jwt.sign(payload, SECRET)

//verify token (authentication)
const verifyToken = (token) => jwt.verify(token, SECRET)

module.exports = {
	hashPassword,
	comparePassword,
	createToken,
	verifyToken
};

