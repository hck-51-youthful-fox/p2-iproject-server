const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Comment, Post } = require("../models/index");
const axios = require("axios");
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

class Controller {
  static async registerUser(req, res) {
    let { email, username, password } = req.body;
    // console.log(req.body);
    try {
      let data = await User.create({
        email: email,
        username: username,
        password: password,
      });

      res.status(201).json({
        id: data.id,
        email: data.email,
        username: data.username,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async loginUser(req, res) {
    let { email, password } = req.body;
    // console.log(req.body);
    try {
      let findUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!findUser) {
        throw { name: "USER_NOT_FOUND" };
      }

      let validatePassword = comparePassword(password, findUser.password);
      if (!validatePassword) {
        throw { name: "USER_NOT_FOUND" };
      }

      const payload = {
        id: findUser.id,
        email: findUser.email,
        username: findUser.username,
        isPremium: findUser.isPremium,
      };

      const access_token = createToken(payload);
      res.status(200).json({
        access_token: access_token,
        id: findUser.id,
        email: findUser.email,
        username: findUser.username,
        isPremium: findUser.isPremium,
      });
    } catch (error) {
      if (error.name === "USER_NOT_FOUND") {
        res.status(401).json({
          message: "Invalid Email/Password",
        });
      }
    }
  }

  static async fetchDataFromApi(req, res) {
    try {
      let { data } = await axios.get(
        "https://www.newsapi.ai/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22locationUri%22%3A%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FIndonesia%22%7D%2C%7B%22dateStart%22%3A%222022-11-05%22%2C%22dateEnd%22%3A%222022-11-09%22%2C%22lang%22%3A%22ind%22%7D%5D%7D%2C%22%24filter%22%3A%7B%22dataType%22%3A%5B%22news%22%5D%7D%7D&resultType=articles&articlesSortBy=date&articlesCount=10&articleBodyLen=-1&apiKey=1ac04d32-99c0-4172-a7d0-c2b7b1988e95&articlesPage=1"
      );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async searchNews(req, res) {
    let { search } = req.body;
    const options = {
      method: "GET",
      url: "https://newscatcher.p.rapidapi.com/v1/search_enterprise",
      params: {
        q: `${search}`,
        lang: "id",
        sort_by: "relevancy",
        page: "1",
        media: "True",
        page_size: "5",
      },
      headers: {
        "X-RapidAPI-Key": "832bfe4441msha6c9d57ff9ea7f5p1087cfjsn9563c7304789",
        "X-RapidAPI-Host": "newscatcher.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}

module.exports = Controller;
