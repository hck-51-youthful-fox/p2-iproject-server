const { User, Rent } = require("../models");
const axios = require("axios");
let showsUrl = "https://api.tvmaze.com/shows";
const cloudinary = require("../setups/cloudinary");
const fs = require("fs");

class Controller {
  static async addRent(req, res, next) {
    let file;
    let url;
    try {
      const uploader = async (path) => await cloudinary.uploads(path, "Images");
      if (req.method == "POST") {
        file = req.file;
        const { path } = file;
        const newPath = await uploader(path);
        url = newPath;
        fs.unlinkSync(path);
      } else {
        return res.status(405).json({ message: "Image Upload Failed" });
      }
      let imgName = Date.now() + "-" + file.originalname;
      let imgUrl = url.url;
      let { ShowId } = req.params;
      let { id: UserId } = req.user;
      let { data } = await axios.get(`${showsUrl}/${ShowId}`);
      let checkRented = await Rent.findOne({
        where: { UserId, ShowId: data.id },
      });
      if (checkRented) {
        throw { name: "Forbidden" };
      }
      let payload = {
        UserId,
        imgName,
        ShowId,
        imgUrl,
        showName: data.name,
        showImgUrl: data.image.original,
        showSummary: data.summary,
      };
      let rented = await Rent.create(payload);
      res.status(201).json(rented);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async removeRent(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Rent.findByPk(id);
      if (!data) {
        throw { name: "DATA_NOT_FOUND" };
      }
      let deleted = await Rent.destroy({ where: { id } });
      res.status(200).json({message: "You have unsubscribed"});
    } catch (error) {
      next(error);
    }
  }
  static async getRented(req, res, next) {
    try {
      let { id: UserId } = req.user;
      let rented = await Rent.findAll({ where: { UserId } });
      res.status(200).json(rented);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
