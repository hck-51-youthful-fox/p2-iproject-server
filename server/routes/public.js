const { VideoController } = require('../controllers/videoController');
const router = require('express').Router();

router.get('/videos', VideoController.findAll)
router.get('/videos/:id', VideoController.findOne)

module.exports = router;
