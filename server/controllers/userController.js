

const { comparePassword, createToken } = require('../helpers/index');
const { User } = require('../models/');

class UserController {
	static async login(req, res, next) {
		try {
			// find email with email input 
			const { email, password } = req.body
			if (!email) throw { name: 'EMPTY_EMAIL'} 
			if (!password) throw { name: 'EMPTY_PASSWORD'}
			const foundUser = await User.findOne({ where: { email } })
			if (!foundUser) {
				throw { name: 'EMPTY_PASSWORD'}
			}
			
			// if email is found in db, compare password input and password in db
			const comparedPassword = comparePassword(password, foundUser.password)
			if (!comparedPassword) {
				throw { name: 'INVALID_CREDENTIALS'}
			}

			// create token, params in createToken is called payload
			const access_token = createToken({
				id: foundUser.id,
			})
			res.status(200).json({ 
				access_token, 
				email: foundUser.email,
				id: foundUser.id,
			})
		} catch (error) {
			next(error)
		}
	}
}

module.exports = {
	UserController
};
