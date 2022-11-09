const express = require("express");
const app = express();
// const expressWs = require("express-ws")(app);
const cors = require("cors");
const { WebSocket } = require("ws");
const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const fireApp = initializeApp(firebaseConfig);
const { ref, set } = require("firebase/database");

const firebaseConfig = {
  databaseURL: "https://investr-12fcc-default-rtdb.firebaseio.com",
};
const webSocket = new WebSocket(
  "wss://ws.finnhub.io?token=cdl1rqiad3i4r9fur7d0cdl1rqiad3i4r9fur7dg"
);

app.get("/", function (req, res, next) {
  console.log("get route", req.testing);
  res.end();
});

function appendData(s, p, t) {
  const db = getDatabase();
  set(ref(db, "stocks/" + s + "/" + t), {
    p,
  });
  //   console.log("updated");
}

webSocket.on("open", function open() {
  webSocket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
  webSocket.send(JSON.stringify({ type: "subscribe", symbol: "GOOG" }));
  webSocket.send(JSON.stringify({ type: "subscribe", symbol: "MSFT" }));
  webSocket.send(JSON.stringify({ type: "subscribe", symbol: "TSLA" }));
  webSocket.send(JSON.stringify({ type: "subscribe", symbol: "AMZN" }));
  webSocket.send(
    JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
  );
  console.log("connected");
});

webSocket.on("message", function message(data) {
  const input = JSON.parse(data);
  if (input.data) {
    // console.log(input.data);
    const tes = input.data.map((el) => {
      appendData(el.s, el.p, el.t);
    });
  } else console.log(input);
});

app.listen(3000);
