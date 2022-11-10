const { YoutubeController } = require('../controllers/youtubeController');
const router = require('express').Router();

router.get('/videos', YoutubeController.findAll)
router.get('/videos/:id', YoutubeController.findOne)

module.exports = router;
