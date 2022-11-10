if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/index')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/', routes)

app.listen(port, () => {
	console.log(`Server menggunakan port: ${port}`);
})

module.exports = app