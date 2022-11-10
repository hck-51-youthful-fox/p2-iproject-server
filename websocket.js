const { WebSocket } = require("ws");
const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  databaseURL: "https://investr-12fcc-default-rtdb.firebaseio.com",
};
const webSocket = new WebSocket(
  "wss://ws.finnhub.io?token=cdl1rqiad3i4r9fur7d0cdl1rqiad3i4r9fur7dg"
);
const fireApp = initializeApp(firebaseConfig);

function appendData(s, p, t) {
  const db = getDatabase();
  set(ref(db, "stocks/" + s + "/" + t), {
    p,
  });
  console.log("updated");
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
    console.log(input.data);
    const tes = input.data.map((el) => {
      appendData(el.s, el.p, el.t);
    });
  } else console.log(input);
});
