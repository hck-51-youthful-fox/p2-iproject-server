const express = require("express");
const Controller = require("./Controller/controllers");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const authentication = require("./middlewares/authentication");
const {
  paymentAuthorization,
  addAuthorization,
  editAuthorization,
} = require("./middlewares/authorization");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", Controller.registerUser);
app.post("/login", Controller.loginUser);
app.get("/api/news", Controller.fetchDataFromApi);
app.get("/api/news/search", Controller.searchNews);
app.get("/news", Controller.fetchNewsFromDB);
app.get("/news/:id", Controller.getNewsById);

app.use(authentication);
app.post("/user/payment", paymentAuthorization, Controller.userPayment);
app.patch("/user/updatePremium", Controller.userUpdateStatus);
app.get("/user/post", Controller.getUserPost);
app.post("/user/addPost", addAuthorization, Controller.addPost);
app.put("/user/edit/:id", editAuthorization, Controller.editPost);
app.post("/user/comment/:postId", Controller.commentPost);
app.delete("/user/delete/:postId", Controller.deletePost);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = app
