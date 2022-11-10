if(process.env.NODE_ENV !== `production`) {
    require('dotenv').config()
}

const express = require("express");
const port = process.env.PORT || 3000
const app = express();
const cors = require(`cors`);
const router =require('./routers/index')

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({ message: "Ini adalah server" });
});

app.use(router)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
