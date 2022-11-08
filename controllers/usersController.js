const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, UserDetail } = require(`../models/index`);
const { OAuth2Client } = require("google-auth-library");

const axios = require("axios");

class Controller {
	static async userRegister(req, res, next) {
		try {
			const { username, email, password } = req.body;
			let newUser = await User.create({
				username,
				email,
				password,
				verified: "",
			});

			await UserDetail.create({
				UserId: newUser.id,
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

			const validation = comparePassword(password, foundUser.password);

			if (!validation) throw { name: `INVALID_CREDENTIALS` };

			const payload = { id: foundUser.id };

			const access_token = signToken(payload);

			res.status(200).json({
				access_token,
				username : foundUser.username,
				verified : foundUser.verified
			});
		} catch (error) {
			next(error);
		}
	}

	static async editUserDetails(req, res, next) {
		let { firstName, lastName, birthDate } = req.body;
		let { id } = req.user;
		try {

			if(birthDate) {
				birthDate = new Date(birthDate)
			}

			await UserDetail.update(
				{ firstName, lastName, birthDate },
				{ where: { UserId: id } }
			);

			res.status(200).json({
				message: "User Verified!",
			});
		} catch (error) {
			next(error);
		}
	}

	static async verifyUser(req, res, next) {
		let { id, verified } = req.user;
		try {
			if(verified == "Verified") {
				throw {name: "ALREADY_VERIFIED", message: "User already verified!"}
			}
			let foundUserDetail = await UserDetail.findOne({ where: { UserId: id } });

			if (!foundUserDetail.firstName || !foundUserDetail.lastName || !foundUserDetail.birthDate) {
				throw {
					name: "INCOMPLETE_DETAILS",
					message: "Please fill in your user details first!",
				};
			}

			const options = {
				method: "GET",
				url: "https://mailcheck.p.rapidapi.com/",
				params: { domain: "mailinator.com" },
				headers: {
					"X-RapidAPI-Key":
						"22f66d6d8amsh3d45c913971d1aap1528bcjsne9b7e46036ea",
					"X-RapidAPI-Host": "mailcheck.p.rapidapi.com",
				},
			};

			let { data } = await axios.request(options);

			if (!data.valid) {
				await User.update({ verified: "Rejected" }, { where: { id } });
				throw { name: "INVALID_EMAIL", message: "Verification rejected!" };
			}

			await User.update({ verified: "Verified" }, { where: { id } });

			res.status(200).json({
				message: "User details updated succesfully",
			});
		} catch (error) {
			next(error)
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
				verified: "Verified",
			},
			hooks: false,
		});

		if (created) {
			await UserDetail.create({
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
			username: user.username,
			verified: user.verified,
		});
	}
}

module.exports = Controller;
