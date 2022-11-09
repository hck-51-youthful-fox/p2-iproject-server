const { UserController } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authenticate');
const router = require('express').Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/premium', UserController.payment)
router.patch('/premium',authenticate, UserController.updateStatus) 
// router.patch('/premium/:id', UserController.updateStatus)

module.exports = router;
