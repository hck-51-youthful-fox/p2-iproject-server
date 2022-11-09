const express = require("express");
const Controller = require("./Controller/controllers");
const app = express();
const port = 3000;
const cors = require("cors");
const authentication = require("./middlewares/authentication");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", Controller.registerUser);
app.post("/login", Controller.loginUser);

app.use(authentication);

app.get('/check', (req, res) => {
  res.send("Aaaaaa")
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = app
