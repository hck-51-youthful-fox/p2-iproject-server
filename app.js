const cors = require("cors");
const express = require("express");
const router = require("./router/index");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
