const { verifyToken } = require("../helpers/index")
const { User } = require('../models/');

const authenticate = async (req, res, next) => {
	try {
		let access_token = req.headers.access_token
		if (!access_token) {
			throw { name: "UNAUTHORIZED" }
		} 
		else {
			let payload = verifyToken(access_token)
			let user = await User.findByPk(payload.id)
			if (!user) throw { name: "UNAUTHORIZED" } 
			// console.log('meong');
			req.user = {
				id: user.id, 
				email: user.email,
				// isPremium: user.isPremium
			}
			// console.log(req.user);
			next()
		}
	} catch (error) {
		next(error)
	}
}

module.exports = {
	authenticate
};
