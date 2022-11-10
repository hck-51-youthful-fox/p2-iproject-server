const { Player } = require("../models/index");
const { Position } = require("../models/index");
const user = require("../models/user");

class Controller {
  static async addPositions(req, res, next) {
    try {
      const { GK, LB, LCB, RCB, RB, LMF, LCMF, RCMF, RMF, SS, ST } = req.body;

      console.log(req.user.id, "<<<< User Id");

      // const footballPlayer = await Player.findAll();
      const deleted = await Position.destroy({
        where: {
          UserId: req.user.id,
        },
      });

      console.log(deleted);

      const dataGK = await Position.create({
        Position: "GK",
        UserId: req.user.id,
        PlayerId: GK,
      });

      const dataLB = await Position.create({
        Position: "LB",
        UserId: req.user.id,
        PlayerId: LB,
      });

      const dataLCB = await Position.create({
        Position: "LCB",
        UserId: req.user.id,
        PlayerId: LCB,
      });

      const dataRCB = await Position.create({
        Position: "RCB",
        UserId: req.user.id,
        PlayerId: RCB,
      });

      const dataRB = await Position.create({
        Position: "RB",
        UserId: req.user.id,
        PlayerId: RB,
      });

      const dataLMF = await Position.create({
        Position: "LMF",
        UserId: req.user.id,
        PlayerId: LMF,
      });

      const dataLCMF = await Position.create({
        Position: "LCMF",
        UserId: req.user.id,
        PlayerId: LCMF,
      });

      const dataRMF = await Position.create({
        Position: "RMF",
        UserId: req.user.id,
        PlayerId: RMF,
      });

      const dataRCMF = await Position.create({
        Position: "RCMF",
        UserId: req.user.id,
        PlayerId: RCMF,
      });

      const dataSS = await Position.create({
        Position: "SS",
        UserId: req.user.id,
        PlayerId: SS,
      });

      const dataST = await Position.create({
        Position: "ST",
        UserId: req.user.id,
        PlayerId: ST,
      });

      // console.log(dataGK);

      const dataReal = await Position.findAll({
        where: {
          UserId: req.user.id,
        },
        include: Player,
      });

      res.status(201).json(dataReal);
    } catch (error) {
      next(error);
    }
  }

  static async viewPositions(req, res, next) {
    console.log(req.user.id);
    try {
      const UserId = req.user.id;
      const data = await Position.findAll({
        where: {
          UserId,
        },
        include: Player,
      });
      console.log(data, "ini data");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deletePosition(req, res, next) {
    try {
      const deleted = await Position.destroy({
        where: {
          UserId: req.user.id,
        },
      });
      res.status(deleted);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
