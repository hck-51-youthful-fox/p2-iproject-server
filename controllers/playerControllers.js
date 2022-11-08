const { Player } = require("../models/index");

class Controller {
  static async viewAllPlayers(req, res, next) {
    try {
      const data = await Player.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
