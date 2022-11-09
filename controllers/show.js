const axios = require("axios");
let showsUrl = "https://api.tvmaze.com/shows";
let searchUrl = "https://api.tvmaze.com/search/shows?";

class Controller {
  static async fetchShows(req, res, next) {
    try {
      let { page } = req.query;
      if (!page) {
        page = 1;
      }
      let { data } = await axios.get(showsUrl);
      function spliceIntoChunks(arr, chunkSize) {
        const res = [];
        while (arr.length > 0) {
          const chunk = arr.splice(0, chunkSize);
          res.push(chunk);
        }
        return res;
      }
      let spliced = spliceIntoChunks(data, 9);
      res.status(200).json(spliced[page - 1]);
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
      let { q } = req.query;
      if (!q) {
        return res.redirect("/");
      }
      let { data } = await axios.get(`${searchUrl}q=${q}`);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
