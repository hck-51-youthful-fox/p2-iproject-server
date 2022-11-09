const { User } = require("../models");
const axios = require("axios");
const apiURL = "https://api-nba-v1.p.rapidapi.com";

class Controller {
  static async getLiveScore(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${apiURL}/games?live=all`,
        headers: {
          "X-RapidAPI-Key":
            "690fd02180msh5d6aced04d3de4bp196137jsna1c955141768",
          "X-RapidAPI-host": "api-nba-v1.p.rapidapi.com",
        },
      });
      let dataGames = data.response;
      let result = dataGames.map((el) => ({
        date: el.date.start,
        status: el.status.long,
        periods: el.periods,
        homeTeam: el.teams.home.name,
        awayTeam: el.teams.visitors.name,
        scoreHomeTeam: el.scores.home.points,
        scoreAwayTeam: el.scores.visitors.points,
        homeTeamLogo: el.teams.home.logo,
        awayTeamLogo: el.teams.visitors.logo,
      }));
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getNBA(req, res, next) {
    try {
      let past = new Date();
      let future = new Date();
      future.setDate(future.getDate() + 30);
      past.setDate(past.getDate() - 30);

      let futureDate = future.toISOString().slice(0, 10);
      let pastDate = past.toISOString().slice(0, 10);
      let year = new Date().getFullYear();
      //console.log(futureDate, pastDate);
      const { data } = await axios({
        method: "GET",
        url: `${apiURL}/games?league=standard&season=${year}&date=${pastDate}`,
        headers: {
          "X-RapidAPI-Key":
            "690fd02180msh5d6aced04d3de4bp196137jsna1c955141768",
          "X-RapidAPI-host": "api-nba-v1.p.rapidapi.com",
        },
      });
      let dataGames = data.response;
      let result = dataGames.map((el) => ({
        date: el.date.start,
        status: el.status.long,
        periods: el.periods,
        arena: el.arena.name,
        city: el.arena.city,
        homeTeam: el.teams.home.name,
        awayTeam: el.teams.visitors.name,
        scoreHomeTeam: el.scores.home.points,
        scoreAwayTeam: el.scores.visitors.points,
        homeTeamLogo: el.teams.home.logo,
        awayTeamLogo: el.teams.visitors.logo,
      }));
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getStanding(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${apiURL}/standings?league=standard&season=2022`,
        headers: {
          "X-RapidAPI-Key":
            "690fd02180msh5d6aced04d3de4bp196137jsna1c955141768",
          "X-RapidAPI-host": "api-nba-v1.p.rapidapi.com",
        },
      });
      let dataGames = data.response;
      let result = dataGames.map((el) => ({
        team: el.team.name,
        teamLogo: el.team.logo,
        conference: el.conference.name,
        rank: el.conference.rank,
        totalWin: el.win.total,
        totalLoses: el.loss.total,
      }));
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // static async getStats(req, res, next) {
  //   try {
  //     const { data } = await axios({
  //       method: "GET",
  //       url: `${apiURL}/games/statistics?id`,
  //       headers: {
  //         "X-RapidAPI-Key": "6b3a7fc344ef953f3e20aaf69a143e9a",
  //         "X-RapidAPI-host": "v2.nba.api-sports.io",
  //       },
  //     });

  //     let dataGames = data.response;
  //     let result = dataGames.map((el) => ({
  //       team: el.team.name,
  //       statistics: el.statistics,
  //     }));
  //     res.status(200).json(result);
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }
}

module.exports = Controller;
