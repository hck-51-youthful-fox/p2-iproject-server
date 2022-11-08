var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
const port = 3000;
var cors = require("cors");
const { User, Cart, Product, Invoice } = require("./models/index");
// const { Op } = require("sequelize");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//register
app.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const role = "client";
    const register = await User.create({ email, password, role });
    let obj = {
      id: register.id,
      email: register.email,
    };
    res.status(201).json(obj);
  } catch (error) {
    // console.log(error);
    next(error);
  }
});
// login
app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const cekemail = await User.findOne({ where: { email: email } });
    console.log(req.body);

    if (!cekemail || !bcrypt.compareSync(password, cekemail.password)) {
      throw { name: "UNAUTHORIZED" };
    }
    let payload = { id: cekemail.id, email };
    const access_token = jwt.sign(payload, "secret");
    console.log(payload);
    res.status(200).json({ access_token });
  } catch (err) {
    next(err);
  }
});
//authentikasi
app.use(async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const cektoken = jwt.verify(access_token, "secret");
    const cekid = await User.findByPk(cektoken.id);
    req.user = {
      userId: cekid.id,
    };
    next();
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log("ihzza");
  let statuscode = 500;
  let message = "Internal server error";
  console.log(err.name);
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    statuscode = 400;
    message = err.errors[0].message;
  } else if (err.name === "EMAIL_NOT_FOUND") {
    statuscode = 400;
    message = "Email is Require";
  } else if (err.name === "PASSWORD_NOT_FOUND") {
    statuscode = 400;
    message = "Password is Require";
  } else if (err.name === "UNAUTHORIZED") {
    statuscode = 401;
    message = "Invalid email/password";
  } else if (err.name === "JsonWebTokenError") {
    statuscode = 401;
    message = "Invalid token";
  } else if (err.name === "HERO_NOT_FOUND") {
    statuscode = 404;
    message = "Hero not found";
  } else if (err.name === "FORBIDDEN") {
    statuscode = 403;
    message = "You are not authorized";
  }
  res.status(statuscode).json({ message });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// module.exports = app;
