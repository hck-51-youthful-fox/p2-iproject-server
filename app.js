if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const port = 3000;
const routes = require("./routes/index");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`PORT: ${port}`);
});
