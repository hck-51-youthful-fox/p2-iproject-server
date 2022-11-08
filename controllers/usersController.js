const { validatePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require(`../models`);
const { OAuth2Client } = require("google-auth-library");

class Controller {
	static async userRegister(req, res, next) {
		try {
			const { username, email, password } = req.body;
			let newUser = await User.create({
				username,
				email,
				password,
				verified: false,
			});

			res.status(201).json({
				msg: `User created successfully.`,
				data: {
					id: newUser.id,
					email: newUser.email,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	static async userLogin(req, res, next) {
		try {
			const { email, password } = req.body;

			if (!email && !password)
				throw {
					name: `BAD_LOGIN_REQUEST`,
					message: `Email and Password is required!`,
				};
			if (!email)
				throw { name: `BAD_LOGIN_REQUEST`, message: `Email is required!` };
			if (!password)
				throw { name: `BAD_LOGIN_REQUEST`, message: `Password is required!` };

			let foundUser = await User.findOne({ where: { email } });
			if (!foundUser) throw { name: `INVALID_CREDENTIALS` };

			const validation = validatePassword(password, foundUser.password);
			if (!validation) throw { name: `INVALID_CREDENTIALS` };

			const payload = { id: foundUser.id };

			const access_token = createToken(payload);

			res
				.status(200)
				.json({
					access_token,
					username: foundUser.username,
					verified: foundUser.verified,
				});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = Controller;
