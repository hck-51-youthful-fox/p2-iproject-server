const { User } = require('../models');

const authorizePremium = async (req, res, next) => {
	try {
		const { id } = req.user
		const user = await User.findByPk(id)
		// if (!user) throw { name: 'data_not_found '} // hrsnya uda dihandle diauhtenticate
		if (user.isPremium) next()
		else throw { name: 'NOT_PREMIUM' }
	} catch (error) {
		next(error)
	}
}

module.exports = {
	authorizePremium,
};