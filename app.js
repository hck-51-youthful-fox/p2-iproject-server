const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/index");
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log("berjalan pada port " + port);
});
