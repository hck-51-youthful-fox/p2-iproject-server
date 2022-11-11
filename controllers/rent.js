const { Rent } = require("../models");
const axios = require("axios");
let showsUrl = "https://api.tvmaze.com/shows";

const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const bufferToStream = (buffer) => {
  const readable = new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
  return readable;
};
class Controller {
  static async addRent(req, res, next) {
    const data = await sharp(req.file.buffer).webp({ quality: 20 }).toBuffer();
    const stream = cloudinary.uploader.upload_stream(
      { folder: "images" },
      async (error, result) => {
        if (error) return console.error(error);
        //   return res.json({ URL: result.secure_url});
        try {
          let imgName = Date.now() + "-" + Math.floor(Math.random() * 1000);
          let imgUrl = result.secure_url;
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
    );
    bufferToStream(data).pipe(stream);
  }
  static async removeRent(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Rent.findByPk(id);
      if (!data) {
        throw { name: "DATA_NOT_FOUND" };
      }
      let deleted = await Rent.destroy({ where: { id } });
      res.status(200).json({ message: "You have unsubscribed" });
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
