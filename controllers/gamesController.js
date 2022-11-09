const { Game, User, Genre, GameGenre, UserReview } = require(`../models/`);
const axios = require("axios");
const { Op } = require("sequelize");

const rawg_url = "https://api.rawg.io/api/games";

class Controller {
	static async fetchGames(req, res, next) {
		let offset = 0;
		let limit = 10;
		let { search, page } = req.query;
		try {

			let options = {
				include: {
					model: Genre,
				},
				where: {},
			};

			if (search) {
				options.where = {
					...options.where,
					name: { [Op.iLike]: `%${search}%` },
				};
			}

			if (typeof +page !== "number") {
				page = 1;
			}

			if (page && page > 1) {
				offset = limit * (page - 1);
			} else {
				page = 1;
			}

			options = {
				...options,
				limit,
				offset,
			};

			let games = await Game.findAll(options);

			console.log(games)

			res.status(200).json({ games, currentPage: page });
		} catch (error) {
			console.log(error)
			next(error);
		}
	}

	static async fetchGameById(req, res, next) {
		try {
			let options = {
				include: [
					Genre,
					{
						model: UserReview,
						include: {
							model: User,
							attributes: {
								exclude: ["password"],
							},
						},
					},
				],
			};
			let { id } = req.params;

			let foundGame = await Game.findByPk(id, options);

			console.log(foundGame);

			res.status(200).json(foundGame);
		} catch (error) {
			console.log(error);
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

			console.log(data);

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

			let promises = [];

			data.results.forEach((game, index) => {
				game.genres.forEach((genre) => {
					let foundGenre = genreList.find((el) => genre.name == el.name);
					promises.push(
						GameGenre.findOrCreate({
							where: {
								GameId: games[index].id,
								GenreId: foundGenre.id,
							},
							defaults: {
								GameId: games[index].id,
								GenreId: foundGenre.id,
							},
						})[0]
					);
				});
			});

			await Promise.all(promises);

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
