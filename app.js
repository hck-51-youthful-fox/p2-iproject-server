const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { User, Hardware } = require("./models/index");
const { comparePassword } = require("./helpers/bcrypt");
const bcrypt = require("bcryptjs");
const { createToken } = require("./helpers/jwt");
const { authentification } = require("./middlewares/auth");

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
