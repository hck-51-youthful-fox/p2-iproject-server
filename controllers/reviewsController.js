const { Game, User, UserReview } = require(`../models`);

class Controller {
	static async fetchReviewsByGameId(req, res, next) {
		let { GameId } = req.params;
		try {
			let reviews = await UserReview.findAll({
				where: { GameId },
				include: [
					{ model: Game },
					{ model: User, attributes: { exclude: [`password`] } },
				],
			});

			res.status(200).json({
				reviews,
			});
		} catch (error) {
			next(error);
		}
	}

	static async postReview(req, res, next) {
		console.log("disini")
		let { review, score } = req.body;
		let { GameId } = req.params;
		let { id: UserId } = req.user;
		try {
			await UserReview.create({
				review,
				score,
				GameId,
				UserId,
			});

			res.status(201).json({
				message: "Review posted succesfull!",
			});
		} catch (error) {
			console.log(error)
			next(error);
		}
	}
}

module.exports = Controller;
