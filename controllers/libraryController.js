const { Library } = require("../models/index");

class Controller {
  // After login and authorization
  static async fetchMyLibrary(req, res, next) {
    /**
     * Desc: Fetch game2 yg ada di library, termasuk game dr API RAWG & Free-to-Play. Utk game2 free to play bisa tanpa limit, utk member 'subscription' bisa 15 paid games
     * Butuh:
     * - Sequelize findAll({where: { UserId }})
     */
  }
  static async fetchFavorites(req, res, next) {
    /**
     * Desc: Fetch game2 yg sudah ada di library dan memiliki value true pada Favorite
     * Butuh:
     * - Sequelize findAll({where: { UserId, where: { Favorite: true } }})
     */
  }
  static async addToLibrary(req, res, next) {
    /**
     * Desc: Add games to library from homepage
     * Butuh:
     * - Sequelize create
     */
  }
  static async removeFromLibrary(req, res, next) {
    /**
     * Desc: remove games from library
     * Butuh:
     * - Sequelize delete
     */
  }
  static async addToFavorites(req, res, next) {
    /**
     * Desc: Ubah status library dari false jadi true atau true jadi false
     * Butuh:
     * - Sequelize update({Favorite}, { where: { UserId }})
     */
  }
}

module.exports = Controller;
