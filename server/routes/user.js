const { UserController } = require('../controllers/userController');
const router = require('express').Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.patch('/:id', UserController.updateStatus)


module.exports = router;
