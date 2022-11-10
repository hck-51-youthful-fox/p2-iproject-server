if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const routes = require("./routes/index");
const bodyParser = require("body-parser");
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: ["https://iprojectp2-1c9e3.web.app"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
    origin: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
