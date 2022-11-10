const express = require("express");
const app = express();
const finnhub = require("finnhub");
const { WebSocket } = require("ws");
const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");
const cors = require("cors");
const { User, Investment, Stock } = require("./models");
const midtransClient = require("midtrans-client");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "cdl1rqiad3i4r9fur7d0cdl1rqiad3i4r9fur7dg";

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const firebaseConfig = {
  databaseURL: "https://investr-12fcc-default-rtdb.firebaseio.com",
};
const fireApp = initializeApp(firebaseConfig);
const { ref, set } = require("firebase/database");
const { comparePass, verifyToken, createToken } = require("./helpers");
const { sendMail } = require("./helpers/nodemailer");

const webSocket = new WebSocket(
  "wss://ws.finnhub.io?token=cdl1rqiad3i4r9fur7d0cdl1rqiad3i4r9fur7dg"
);

// function appendData(s, p, t) {
//   const db = getDatabase();
//   set(ref(db, "stocks/" + s + "/" + t), {
//     p,
//   });
//   // console.log("updated");
// }

// webSocket.on("open", function open() {
//   webSocket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
//   webSocket.send(JSON.stringify({ type: "subscribe", symbol: "GOOG" }));
//   webSocket.send(JSON.stringify({ type: "subscribe", symbol: "MSFT" }));
//   webSocket.send(JSON.stringify({ type: "subscribe", symbol: "TSLA" }));
//   webSocket.send(JSON.stringify({ type: "subscribe", symbol: "AMZN" }));
//   webSocket.send(
//     JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
//   );

//   console.log("connected");
// });

// webSocket.on("message", function message(data) {
//   const input = JSON.parse(data);
//   if (input.data) {
//     console.log(input.data);
//     const tes = input.data.map((el) => {
//       appendData(el.s, el.p, el.t);
//     });
//   } else console.log(input);
// });

//code express
app.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const data = await User.create({ username, email, password });
    res.status(201).json({ id: data.id, email: data.email });
  } catch (error) {
    next(error);
  }
});
app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) throw { name: "EMAIL_REQ" };
    if (!password) throw { name: "PASS_REQ" };
    const data = await User.findOne({ where: { email } });

    if (!data) throw { name: "UNAUTH" };
    if (!comparePass(password, data.password)) throw { name: "UNAUTH" };

    const token = createToken({
      id: data.id,
      email: data.email,
      username: data.username,
    });
    res.status(200).json({ access_token: token });
  } catch (error) {
    next(error);
  }
});

app.use(async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { name: "INVALID" };

    const payload = verifyToken(access_token);

    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "INVALID" };

    req.user = {
      id: payload.id,
      email: payload.email,
      username: payload.username,
    };
    next();
  } catch (error) {
    next(error);
  }
});

app.post("/payment", (req, res, next) => {
  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: "SB-Mid-server-e9DuibJqeKpE4vwEgak8hir5",
  });

  let orderId = new Date().valueOf();

  let parameter = {
    transaction_details: {
      order_id: `order-${orderId}-${req.user.email.slice(0, 3)}`,
      gross_amount: 34990,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      email: req.user.email,
      username: req.user.email.split("@")[0],
      // email: 'ivanjisoo@gmail.com',
      // username: 'ivanxjisoo'
    },
  };

  snap
    .createTransaction(parameter)
    .then((transaction) => {
      // transaction token
      let transactionToken = transaction.token;
      // console.log(transaction);
      res.status(201).json({ transactionToken });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

app.post("/buy/:StockId", async (req, res, next) => {
  try {
    const StockId = req.params.StockId;
    const UserId = req.user.id;

    const data = await Investment.create({
      price: 125,
      volume: 25,
      StockId,
      UserId,
    });
    sendMail();
    res.status(201).json("success buy stocks");
  } catch (error) {
    next(error);
  }
});

app.get("/stocks", async (req, res, next) => {
  try {
    const UserId = req.user.id;

    const data = await Investment.findAll({
      where: { UserId },
      include: { model: Stock },
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  let err = error.name;
  let code = 500;
  let str = "Internal server error";

  switch (err) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      code = 400;
      str = error.errors[0].message;
      break;
    case "PASS_REQ":
      code = 400;
      str = "Password is required";
      break;
    case "EMAIL_REQ":
      code = 400;
      str = "Email is required";
      break;
    case "UNAUTH":
      code = 401;
      str = "Invalid email/password";
      break;
    case "INVALID":
    case "JsonWebTokenError":
      code = 401;
      str = "Invalid token";
      break;
  }
  res.status(code).json({ message: str });
});

app.listen(3000);
