const { Game, Genre, GameGenre } = require(`../models/`);
const axios = require("axios");

const rawg_url = "https://api.rawg.io/api/games";

class Controller {
	static async fetchGames(req, res, next) {
		try {
			let { genre } = req.params;

			let where = {};

			let games = await Game.findAll({ include: Genre });

			res.status(200).json({
				games,
			});
		} catch (error) {
			next(error);
		}
	}

	static async exploreGames(req, res, next) {
		try {
			let { page } = req.query;
			let query = `key=${process.env.RAWG_KEY}&page_size=10`;

			if (page > 1) {
				query += `&page=${page}`;
			}

			let { data } = await axios.get(`${rawg_url}?${query}`);

			let genreList = await Genre.findAll();

			let games = await Promise.all(
				data.results.map((game) => {
					return Game.findOrCreate({
						where: { name: game.name },
						defaults: {
							name: game.name,
							releaseDate: game.released,
							imageUrl: game.background_image,
							rating: game.metacritic || 0,
						},
					})
						.then((result) => {
							//index 0 data, index 1 true/false created
							return result[0];
						})
						.catch((error) => {});
				})
			);

			let GameGenres = await Promise.all(
				data.results.map((game) => {
					return game.genres.map((genre) => {
						let foundGenre = genreList.find((el) => genre.name == el.name);
						return GameGenre.findOrCreate({
							where: {
								GameId: game.id,
								GenreId: foundGenre.id,
							},
							defaults: {
								GameId: game.id,
								GenreId: foundGenre.id,
							},
						})
						.then((result) => {
							return result[0];
						})
						.catch((error) => {})
					});
				})
			);

			console.log(GameGenres);

			res.status(200).json({
				next: data.next,
				games,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = Controller;
