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
          "X-RapidAPI-Key": process.env.API_KEY_NBA,
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
          "X-RapidAPI-Key": process.env.API_KEY_NBA,
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
          "X-RapidAPI-Key": process.env.API_KEY_NBA,
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

  static async payment(req, res, next) {
    try {
      const midtransClient = require("midtrans-client");
      // Create Core API instance
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.SERVER_KEY,
      });
      const randomOrder = Math.floor(Math.random() * 1000);
      let parameter = {
        transaction_details: {
          order_id: `Premium-User-Account-${randomOrder}`,
          gross_amount: 200000,
        },
        customerDetails: {
          email: req.user.email,
        },
        credit_card: {
          secure: true,
        },
      };
      const transaction = await snap.createTransaction(parameter);
      res.status(201).json({ transactionToken: transaction.token });
    } catch (error) {
      console.log(error);
    }
  }

  static async statusUpdate(req, res, next) {
    try {
      let user = req.user.id;
      await User.update(
        { status: "premium" },
        {
          where: {
            id: user,
          },
        }
      );
      res.status(200).json({ msg: "update sucess" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
