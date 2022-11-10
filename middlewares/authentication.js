const { verifyToken } = require("../helpers/jwt");
const { User } = require(`../models/`);

const loginAuthentication = async (req, res, next) => {
	try {
		let { access_token } = req.headers;

		if (!access_token) {
			throw { name: `INVALID_ACCESS` };
		}

		const loggedUser = verifyToken(access_token);

		if (!loggedUser) {
			throw { name: `INVALID_ACCESS` };
		}

		const foundUser = await User.findOne({ where: { id: loggedUser.id } });

		if (!foundUser) {
			throw { name: `INVALID_ACCESS` };
		}

		req.user = {
			id: foundUser.id,
			verified: foundUser.verified,
		};

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = { loginAuthentication };