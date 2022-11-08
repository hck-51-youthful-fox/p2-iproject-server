const { validatePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, UserDetail } = require(`../models`);
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

			res.status(200).json({
				access_token,
				username: foundUser.username,
				verified: foundUser.verified,
			});
		} catch (error) {
			next(error);
		}
	}

	static async googleLogin(req, res, next) {
		const client = new OAuth2Client(process.env.GOOGLE_ID);
		const ticket = await client.verifyIdToken({
			idToken: req.headers.google_token,
			audience: process.env.GOOGLE_ID,
		});
		const googlePayload = ticket.getPayload();

		const [user, created] = await User.findOrCreate({
			where: { email: googlePayload.email },
			defaults: {
				username: googlePayload.name,
				email: googlePayload.email,
				password: `loginwithgoogle`,
				verified : true
			},
			hooks: false,
		});

		if (created) {
			const newUserDetails = UserDetail.create({
				firstName: "",
				lastName: "",
				birthDate: "",
				UserId: user.id,
			});
		}

		const payload = { id: user.id };
		let access_token = createToken(payload);

		res.status(200).json({
			access_token,
      username : user.username,
      verified : user.verified
		});
	}
}

module.exports = Controller;
