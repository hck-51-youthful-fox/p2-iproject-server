if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const routes = require("./routes/index");
const bodyParser = require("body-parser")
const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
