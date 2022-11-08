const express = require("express");
const router = express.Router();
const Controller = require("../controllers/rent");
const authorization = require("../middlewares/authorize");
const upload = require("../setups/multer")



router.get("/myrent", Controller.getRented);
router.post("/:ShowId",upload.single('image') ,Controller.addRent);
router.delete("/:id", authorization, Controller.removeRent);

module.exports = router;

//coba memory storage agar tipe datanya buffer sehingga bisa dikirim ke third party API
// Baca form data. url encoded tidak bisa file, hanya string. multipart
