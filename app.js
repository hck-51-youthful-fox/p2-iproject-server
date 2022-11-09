const express = require("express");
const Controller = require("./Controller/controllers");
const app = express();
const port = 3000;
const cors = require("cors");
const authentication = require("./middlewares/authentication");
const { paymentAuthorization, addAuthorization } = require("./middlewares/authorization");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", Controller.registerUser);
app.post("/login", Controller.loginUser);
app.get("/api/news", Controller.fetchDataFromApi);
app.get("/api/news/search", Controller.searchNews);

app.use(authentication);
app.post("/user/payment", paymentAuthorization, Controller.userPayment);
app.post("/user/addPost", addAuthorization, Controller.addPost);
app.post("/user/edit/:id", addAuthorization, Controller.addPost);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = app
