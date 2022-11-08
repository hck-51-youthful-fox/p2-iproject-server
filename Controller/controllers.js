const { User, Comment, Post } = require("../models/index");

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
}

module.exports = Controller;
