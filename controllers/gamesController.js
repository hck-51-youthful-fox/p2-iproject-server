const { Game, Genre } = require(`../models/`);
const axios = require("axios");
const { response } = require("express");

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
			console.log(error);
			next(error);
		}
	}

	static async exploreGames(req, res, next) {
		try {
			let { page } = req.params;
			let query = `key=${process.env.RAWG_KEY}&page_size=20`;

			if (page) {
				query += `&page=${page}`;
			}

			let { data } = await axios.get(`${rawg_url}/?${query}`);

			res.status(200).json({
				next: data.next,
				games: data.results,
			});
		} catch (error) {
			next(error);
		}
	}

	static async postGameFromExplore(req, res, next) {
		let { id } = req.params;
		try {
			let { data } = await axios.get(`${rawg_url}/${id}`);

			if (!data) {
				throw { name: "GAME_NOT_FOUND", message: "Game not Found!" };
			}

			let [game, created] = await Game.findOrCreate({
				where: { name: data.name },
				defaults: {
					name: data.name,
					releaseDate: data.released,
					rating: data.metacritic,
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
