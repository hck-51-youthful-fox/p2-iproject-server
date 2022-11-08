const { Game } = require("../models/index");

class Controller {
  // Doesn't need to login
  static async fetchGames(req, res, next) {
    /**
     * Desc: Fetch semua games dari 3rd party api (RAWG API)
     * Butuh:
     * - Axios GET RAWG
     * - Search (name or publisher)
     */
    res.status(200).json({ message: "Test fetch" });
  }
  static async fetchFreeGames(req, res, next) {
    /**
     * Desc: Fetch semua free games dari 3rd party api (Free-to-Play API)
     * Butuh:
     * - Axios GET Free-to-Play API
     * - Search (name or publisher)
     */
  }
  static async fetchGameDetail(req, res, next) {
    /**
     * Desc: Fetch game detail by ID
     * Butuh:
     * - Axios GET RAWG
     * - Sequelize create
     */
  }
  static async fetchFreeGameDetail(req, res, next) {
    /**
     * Desc: Fetch game detail by ID
     * Butuh:
     * - Axios GET Free-to-Play
     * - Sequelize create
     */
  }
}

module.exports = Controller;
