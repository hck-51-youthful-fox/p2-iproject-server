const { Games } = require(`../models`);

const rawg_url = "https://api.rawg.io/api/games";

class Controller {
	static async fetchGames(req, res, next) {
		try {
			let { genre } = req.params;

			let where = {};

			let games = Games.findAll(where);

			res.status(200).json({
				games,
			});
		} catch (error) {
			next(error);
		}
	}

	static async exploreGames() {
		try {
			let { data } = axios.get(`${rawg_url}/`, {});
		} catch (error) {
			next(error);
		}
	}

	static async postGameFromExplore() {
		let { id } = req.params;
		try {
			// https://api.rawg.io/api/games/{id}
			let { data } = await axios.get(`${rawg_url}/${id}`);

			if (!data) {
				throw { name: "GAME_NOT_FOUND", message: "Game not Found!" };
			}

			let [game, created] = await Games.findOrCreate({
				where: { name: data.name },
				defaults: {
					name: data.name,
					releaseDate: data.released,
					rating: data.rating,
				},
			});

			res.status(200).json({
				id: game.id,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = Controller;
