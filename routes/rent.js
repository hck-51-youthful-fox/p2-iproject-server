const express = require("express");
const router = express.Router();
const Controller = require("../controllers/rent");
const path = require("path");
const multer = require("multer");

// const storage = multer.memoryStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

router.get("/myrent", Controller.getRented)
router.post("/:ShowId", Controller.addRent);
router.delete("/:id", Controller.removeRent);

module.exports = router;

//coba memory storage agar tipe datanya buffer sehingga bisa dikirim ke third party API
// Baca form data. url encoded tidak bisa file, hanya string. multipart
