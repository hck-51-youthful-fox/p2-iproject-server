if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const { User, Thread, Comment } = require("./models/index");
const bcrypt = require("bcryptjs");
const { createToken } = require("./helpers/jwt");
const { authentification } = require("./middlewares/auth");
const axios = require("axios");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "pcpeekiproject@gmail.com",
        pass: "hykfgkafyolsvabg",
      },
    });

    let info = await transporter.sendMail({
      from: "pcpeekiproject@gmail.com",
      to: `${email}`,
      subject: "Welcome to PCPeeker",
      text: "Selamat datang di PCPeeker, akun anda sudah aktif",
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

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

app.get("/comments", authentification, async (req, res, next) => {
  try {
    const data = await Comment.findAll();
    res.status(200).json(data);
  } catch (error) {
    let message;
    if (error.name === "SequelizeValidationError") {
      message = error.errors[0].message;
    }
    if (error.name === "SequelizeUniqueConstrainError") {
      message = error.errors[0].message;
    }
  }
});

app.get("/detail/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Thread.findAll({
      include: {
        model: Comment,
        attributes: ["UserId", "comment", "imgUrl"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      where: {
        id: id,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/comments/:id", authentification, async (req, res, next) => {
  try {
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({ message: "Comment cannot blank" });
    }
    const imgUrl = "-";
    const data = await Comment.create({
      UserId: req.user.id,
      ThreadId: req.params.id,
      comment,
      imgUrl,
    });
    res.status(200).json(data);
  } catch (error) {
    let message;
    if (error.name === "SequelizeValidationError") {
      message = error.errors[0].message;
    }
    if (error.name === "SequelizeUniqueConstrainError") {
      message = error.errors[0].message;
    }
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
    const topVGA = top.slice(1, 5);
    topVGA.forEach((element) => {
      let data = element.split(",");
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
    const data = await Comment.destroy({
      where: {
        UserId: req.user.id,
        ThreadId: +req.params.id,
      },
    });
    res.status(200).json({ message: `Comment ${data} deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/thread", async (req, res, next) => {
  try {
    let { page, name } = req.query;
    if (!page) {
      page = 1;
    }
    if (page === 0) {
      page = 1;
    }
    if (!name) {
      name = "";
    }
    const limit = 6;
    let options = {
      include: [{ model: Comment }],
      order: [["createdAt", "DESC"]],
      limit,
      offset: limit * page,
      distinct: true,
    };

    if (name) {
      options.where = { name: { [Op.iLike]: `%${name}%` } };
    }
    const data = await Thread.findAndCountAll(options);
    const totalPages = Math.ceil(data.count / limit);
    data.totalPages = totalPages;
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/add", authentification, async (req, res, next) => {
  const like = 0;
  const { name, rating, thread } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Topic is required" });
  }
  if (!rating) {
    return res.status(400).json({ message: "Rating is required" });
  }
  if (!thread) {
    return res.status(400).json({ message: "Rating is required" });
  }
  try {
    const data = await Thread.create({
      name,
      rating,
      thread,
      like,
    });
    res.status(201).json({ data });
  } catch (error) {
    let message;
    if (error.name === "SequelizeValidationError") {
      message = error.errors[0].message;
    }
    if (error.name === "SequelizeUniqueConstrainError") {
      message = error.errors[0].message;
    }
  }
});

app.post("/login-google", async (req, res, next) => {
  const { OAuth2Client } = require("google-auth-library");
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const { google_token } = request.body;
  try {
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];

      const [addGoogle, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: `${payload.given_name} ${payload.family_name}`,
          email: payload.email,
          role: "staff",
          password: "321sehat",
          phoneNumber: "12345678",
          address: "Jalan ABC pedas",
        },
      });
      const newPayload = {
        id: addGoogle.id,
        role: addGoogle.role,
        username: addGoogle.username,
      };
      const access_token = createToken(newPayload);
      respone.status(200).json({ access_token, newPayload });
    }
    verify();
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
