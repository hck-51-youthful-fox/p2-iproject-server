const axios = require("axios");
let showsUrl = "https://api.tvmaze.com/shows";
let searchUrl = "https://api.tvmaze.com/search/shows?";

class Controller {
  static async fetchShows(req, res, next) {
    try {
      let { data } = await axios.get(showsUrl);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async fetchShowById(req, res, next) {
    try {
      let { showId } = req.params;
      let { data } = await axios.get(`${showsUrl}/${showId}`);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async searchShows(req, res, next) {
    try {
      let { search } = req.query;
      if (!search) {
        return res.redirect(showsUrl);
      }
      let { data } = await axios.get(`${searchUrl}q=${search}`);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
