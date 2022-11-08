const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { User, Hardware, Comment } = require("./models/index");
const { comparePassword } = require("./helpers/bcrypt");
const bcrypt = require("bcryptjs");
const { createToken } = require("./helpers/jwt");
const { authentification } = require("./middlewares/auth");
const axios = require("axios");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const data = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({ id: data.id, email: data.email });
  } catch (error) {
    console.log(error);
    let message;
    if (error.name === "SequelizeValidationError") {
      message = error.errors[0].message;
    }
    if (error.name === "SequelizeUniqueConstrainError") {
      message = error.errors[0].message;
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    const data = await User.findOne({
      where: {
        email,
      },
    });

    if (!data) {
      return res.status(401).json({ message: "Invalid email/password" });
    }

    const comparePassword = bcrypt.compareSync(password, data.password);
    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid email/password" });
    }
    const payload = {
      id: data.id,
      email: data.email,
    };
    const access_token = createToken(payload);
    res.status(200).json({ access_token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/hardwares", authentification, async (req, res, next) => {
  try {
    const data = await Hardware.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/comments", authentification, async (req, res, next) => {
  try {
    const data = await Comment.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/detail/:id", authentification, async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Hardware.findAll({
      include: {
        model: Comment,
        attributes: ["UserId", "comment"],
      },
      where: {
        id: id,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/detail/:id", authentification, async (req, res, next) => {
  try {
    const { comment } = req.body;
    const data = await Comment.create({
      UserId: req.user.id,
      HardwareId: req.params.id,
      comment,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/news", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=id&category=technology&apiKey=a461f6286f304f9f86bae3b2817e6439`
    );
    const { data: top } = await axios.get(
      `https://top-computer-parts.p.rapidapi.com/gpu`,
      {
        headers: {
          "X-RapidAPI-Key":
            "edd710fddbmsh1b70c326f0e172ep16d0f9jsn5c6b7aae0e20",
          "X-RapidAPI-Host": "top-computer-parts.p.rapidapi.com",
        },
      }
    );
    const dataVGA = [];
    const topVGA = top.slice(1, 6);
    topVGA.forEach((element) => {
      let data = element.split(",");
      console.log(data);
      let obj = {
        merk: `${data[2]}`,
        type: `${data[2]} ${data[3]}`,
        ranking: `${data[4]}`,
        bechmark: `${data[6]}`,
        source: `${data[7]}`,
      };
      dataVGA.push(obj);
    });

    const dataNews = data.articles.slice(1, 5);
    dataNews.forEach((el) => {
      delete el.source;
    });
    res.status(200).json({ topVGA: dataVGA, news: dataNews });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/detail/:id", authentification, async (req, res, next) => {
    try {
      const { comment } = req.body;
      const data = await Comment.create({
        UserId: req.user.id,
        HardwareId: req.params.id,
        comment,
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
