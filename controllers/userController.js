const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { Log, LogSpotter, User, UserDetail } = require('../models/index')

class UserController {
	static async renderFormRegister(req, res, next) {
		try {
			const { callsign, email, password, repassword } = req.body
			if (password !== repassword) {
				throw { name: `PasswordNotMatch` }
			} else {
				const dataUser = await User.create({
					callsign, email, password, role: 'User',
				})

				res.status(201).json({
					callsign: dataUser.callsign,
					email: dataUser.email,
					password: dataUser.password,
					role: dataUser.role,
				})
			}

		} catch (error) {
			next(error)
		}
	}

	static async renderFormLogin(req, res, next) {
		try {
			const { email, password } = req.body
			const foundUser = await User.findOne({
				where: { email }
			})

			if (!foundUser) {
				throw { name: 'InvalidCredentials' }
			} else {
				const comparedPassword = comparePassword(password, foundUser.password)


				if (!comparedPassword) {
					throw { name: 'InvalidCredentials' }
				} else {
					const { callsign, email, role } = foundUser
					const user_id = foundUser.id
					const payload = { id: user_id }
					const access_token = createToken(payload)

					console.log(callsign, email, role, user_id, payload, access_token, '--------------')

					res.status(200).json({
						access_token, user_id, callsign, email, role
					})
				}
			}
		} catch (error) {
			next(error)
		}
	}
}

module.exports = UserController