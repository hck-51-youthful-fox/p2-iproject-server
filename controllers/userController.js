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
}

module.exports = UserController