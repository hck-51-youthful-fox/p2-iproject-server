const axios = require("axios");

class Controller {
  static async viewLeagueData(req, res, next) {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://app.sportdataapi.com/api/v1/soccer/leagues",
        headers: { apikey: "bf08cd10-6015-11ed-9e2d-d35586afc9ef" },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async viewPremierLeague(req, res, next) {
    try {
      const { data } = await axios({
        method: "get",
        url: "https://api.sportsdata.io/v3/soccer/scores/json/SeasonTeams/1?key=d2c597a69c084719ad03c2d553e04af2",
        headers: { key: "d2c597a69c084719ad03c2d553e04af2" },
      });
      console.log(data);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async searchPlayer(req, res, next) {
    try {
      console.log(req.query);
      const { search } = req.query;

      let find = "";

      if (search) {
        find = search;
      }

      const { data } = await axios({
        method: "get",
        url: `http://fm-api-heroku.herokuapp.com/api/v2/players/${find}`,
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
