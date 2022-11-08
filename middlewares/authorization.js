const { Game } = require(`../models/`);

const postReviewAuthorization = async (req, res, next) => {
	try {
		const { id: UserId, verified } = req.user;
		const { GameId: id } = req.params;

		const foundGames = await Game.findByPk(id);

		if (!foundGames) {
			throw { name: `DATA_NOT_FOUND`, id };
		}

		if (!verified || verified == "Rejected") {
			throw { name: `FORBIDDEN` };
		}

		next();
	} catch (error) {
		next(error);
	}
};

// const userDetailUpdateAuthorization = async (req, res, next) => {
// 	try {
// 		const { id } = req.params;

// 		const foundMovie = await Movie.findByPk(id);

// 		if (!foundMovie) {
// 			throw { name: `DATA_NOT_FOUND`, id };
// 		}

// 		if (req.user.role.toUpperCase() != `ADMIN`) {
// 			throw { name: `FORBIDDEN` };
// 		} else {
// 			req.movie = { title: foundMovie.title, status: foundMovie.status };
// 			next();
// 		}
// 	} catch (error) {
// 		next(error);
// 	}
// };

module.exports = {
	postReviewAuthorization,
	// userDetailUpdateAuthorization,
};
