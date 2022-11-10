const { LikeController } = require('../controllers/likeController')
const router = require('express').Router();

router.get('/', LikeController.findAll)
router.post('/:videoId', LikeController.findOrCreate)
// router.delete('/:id', LikeController.destroy)

module.exports = router;
