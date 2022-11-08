const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { User } = require("./models/index");

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
