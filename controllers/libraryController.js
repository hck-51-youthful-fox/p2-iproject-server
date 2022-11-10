const { Library } = require("../models/index");

class Controller {
  // After login and authorization
  static async fetchMyLibrary(req, res, next) {
    /**
     * Desc: Fetch game2 yg ada di library, termasuk game dr API RAWG & Free-to-Play. Utk game2 free to play bisa tanpa limit, utk member 'subscription' bisa 15 paid games
     * Butuh:
     * - Sequelize findAll({where: { UserId }})
     */
    try {
      const UserId = req.user.id;
      const data = await Library.findAll({
        where: {
          UserId,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async fetchFavorites(req, res, next) {
    /**
     * Desc: Fetch game2 yg sudah ada di library dan memiliki value true pada Favorite
     * Butuh:
     * - Sequelize findAll({where: { UserId, where: { Favorite: true } }})
     */
    try {
      const UserId = req.user.id;
      const data = await Library.findAll({
        where: {
          UserId,
          favorite: true,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async removeFromLibrary(req, res, next) {
    /**
     * Desc: remove games from library
     * Butuh:
     * - Sequelize delete
     */
    try {
      const { id } = req.params;

      const findLibrary = await Library.findByPk(id);

      if (!findLibrary) {
        throw { name: "DATA_NOT_FOUND_LIBRARY" };
      }

      const data = await Library.destroy({
        where: { id },
      });

      // console.log(data);
      res.status(200).json(data);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  static async updateFavorite(req, res, next) {
    /**
     * Desc: Ubah status library dari false jadi true atau true jadi false
     * Butuh:
     * - Sequelize update({Favorite}, { where: { UserId }})
     */
    try {
      const { id } = req.params;
      const { favorite } = req.body;

      const findLibrary = await Library.findByPk(id);

      if (!findLibrary) {
        throw { name: "DATA_NOT_FOUND_LIBRARY" };
      }

      const data = await Library.update(
        { favorite },
        {
          where: { id },
        }
      );
      // console.log(data);
      res.status(200).json(data);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  static async updateStatus(req, res, next) {
    /**
     * Desc: Ubah status library dari false jadi true atau true jadi false
     * Butuh:
     * - Sequelize update({status}, { where: { UserId }})
     */
    try {
      const { id } = req.params;
      const { status } = req.body;
      const findLibrary = await Library.findByPk(id);

      if (!findLibrary) {
        throw { name: "DATA_NOT_FOUND_LIBRARY" };
      }

      const data = await Library.update(
        { status },
        {
          where: { id },
        }
      );
      // console.log(data);
      res.status(200).json(data);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

module.exports = Controller;
