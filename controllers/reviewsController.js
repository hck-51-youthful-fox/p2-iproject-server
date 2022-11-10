const { Game, User, UserReview } = require(`../models`);
const axios = require("axios");

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
		console.log("disini");
		let { review, score } = req.body;
		let { GameId } = req.params;
		let { id: UserId } = req.user;
		try {
			const options = {
				method: "GET",
				url: "https://community-purgomalum.p.rapidapi.com/json",
				params: {
					text: review,
					add: "asu,babi,anjing,tai,sialan,bajingan",
					fill_text: "***",
				},
				headers: {
					"X-RapidAPI-Key":
						"22f66d6d8amsh3d45c913971d1aap1528bcjsne9b7e46036ea",
					"X-RapidAPI-Host": "community-purgomalum.p.rapidapi.com",
				},
			};

			let { data } = await axios.request(options);

			review = data.result

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
			console.log(error);
			next(error);
		}
	}
}

module.exports = Controller;
