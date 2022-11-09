const { Game } = require("../models/index");
const axios = require("axios");

const ftgUrl = "https://www.freetogame.com/api";
const rawgUrl = "https://api.rawg.io/api";
const RAWG_SECRET = process.env.RAWG_SECRET;

class Controller {
  // Doesn't need to login
  static async fetchGames(req, res, next) {
    /**
     * Desc: Fetch semua games dari 3rd party api (RAWG API)
     * Butuh:
     * - Axios GET RAWG
     * - Search (name or publisher)
     */
    try {
      const { data } = await axios.get(`${rawgUrl}/games`, {
        params: {
          key: RAWG_SECRET,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  static async fetchFreeGames(req, res, next) {
    /**
     * Desc: Fetch semua free games dari 3rd party api (Free-to-Play API)
     * Butuh:
     * - Axios GET Free-to-Play API
     * - Search (name or publisher)
     */
    try {
      const { data } = await axios.get(`${ftgUrl}/games`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async fetchGameDetail(req, res, next) {
    /**
     * Desc: Fetch game detail by ID
     * Butuh:
     * - Axios GET RAWG
     * - Sequelize create
     */
    try {
      const { id } = req.params;
      const { data } = await axios.get(`${rawgUrl}/games/${id}`, {
        params: {
          key: RAWG_SECRET,
        },
      });

      // required
      const name = data.name;
      const released = data.released;
      const gameUrl = data.website;
      const description = data.description.replace("<p>", "").replace("</p>", "");
      const publisher = data.publishers[0].name;
      const isFree = false;

      // not required
      const rawgId = data.id;
      const imgUrl = data.background_image;
      const thumbnailUrl = data.background_image_additional;

      const [game, created] = await Game.findOrCreate({
        where: {
          rawgId: id,
        },
        defaults: {
          name,
          released,
          gameUrl,
          description,
          publisher,
          isFree,
          rawgId,
          imgUrl,
          thumbnailUrl,
        },
      });

      res.status(201).json(game);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async fetchFreeGameDetail(req, res, next) {
    /**
     * Desc: Fetch game detail by ID
     * Butuh:
     * - Axios GET Free-to-Play
     * - Sequelize create
     */
    try {
      const { id } = req.params;
      const { data } = await axios.get(`${ftgUrl}/game`, {
        params: {
          id,
        },
      });

      // required
      const name = data.title;
      const released = data.release_date;
      const gameUrl = data.game_url;
      const description = data.description;

      const publisher = data.publisher;
      const isFree = true;

      // not required
      const rawgId = null;
      const imgUrl = data.screenshots[0].image;
      const thumbnailUrl = data.thumbnail;

      const [game, created] = await Game.findOrCreate({
        where: {
          gameUrl,
        },
        defaults: {
          name,
          released,
          gameUrl,
          description,
          publisher,
          isFree,
          rawgId,
          imgUrl,
          thumbnailUrl,
        },
      });

      res.status(201).json(game);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async addToLibrary(req, res, next) {
    /**
     * Desc: Add games to library from homepage
     * Butuh:
     * - Sequelize create
     */
    try {
      const GameId = req.params.id;
      const UserId = req.user.id;

      const findGame = await Game.findByPk(GameId);

      if (!findGame) {
        throw { name: "DATA_NOT_FOUND" };
      }

      const [data, created] = await Library.findOrCreate({
        where: { GameId },
        defaults: {
          GameId,
          UserId,
          status: "unfinished",
          favorite: false,
        },
      });

      // console.log(data);
      res.status(201).json(data);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

module.exports = Controller;
