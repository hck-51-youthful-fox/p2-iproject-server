const express = require('express');
const router = express.Router()

const { authenticate } = require('../middlewares/authenticate');
const { authorizePremium } = require('../middlewares/authorize');
// const { authorizeCustomer } = require('../middlewares/authorize');


const userRouter = require('./user');
const publicRouter = require('./public'); 
const likeRouter = require('./like'); // favorites buat premium acc


router.use('/', userRouter)
router.use('/pub', publicRouter)
// router.use(authenticate)
router.use('/likes', authenticate, authorizePremium, likeRouter)

module.exports = router;

