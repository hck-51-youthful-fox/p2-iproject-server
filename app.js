const express = require("express");
const Controller = require("./Controller/controllers");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", Controller.registerUser);
app.post("/login", Controller.loginUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = app
