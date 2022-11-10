

const { comparePassword, createToken } = require('../helpers/index');
const { User } = require('../models/');
const { sendMail } = require('../helpers/nodemailer');

class UserController {
	static async register (req, res, next) {
		try {
			const { email, password, avatar } = req.body
			if (!email) throw { name: 'EMPTY_EMAIL'} 
			if (!password) throw { name: 'EMPTY_PASSWORD'}
			const newUser = await User.create({ email, password, avatar })
			res.status(201).json({
				id: newUser.id,
				email: newUser.email,
				avatar: newUser.avatar
			})
		} catch (error) {
			next(error)
		}
	}
	static async login(req, res, next) {
		try {
			// find email with email input 
			const { email, password } = req.body
			if (!email) throw { name: 'EMPTY_EMAIL'} 
			if (!password) throw { name: 'EMPTY_PASSWORD'}
			const foundUser = await User.findOne({ where: { email } })
			if (!foundUser) {
				throw { name: 'EMPTY_PASSWORD'}
			}
			
			// if email is found in db, compare password input and password in db
			const comparedPassword = comparePassword(password, foundUser.password)
			if (!comparedPassword) {
				throw { name: 'INVALID_CREDENTIALS'}
			}

			// create token, params in createToken is called payload
			const access_token = createToken({
				id: foundUser.id,
				// isPremium: foundUser.isPremium
			})
			res.status(200).json({ 
				access_token, 
				email: foundUser.email,
				id: foundUser.id,
				isPremium: foundUser.isPremium,
				avatar: foundUser.avatar
			}) 
		} catch (error) {
			next(error)
		}
	}

	static async updateStatus(req, res, next) {
		try {
			const id = req.user.id
			// console.log(req.user);
			// const { isPremium } = req.body
			const foundUser = await User.findByPk(+id)
			if (!foundUser) throw { name: 'DATA_NOT_FOUND', model: 'User'}
			const data = await User.update(
				{ isPremium: true },
				{ where: {id} }
			)
			// console.log('success');
			sendMail(req.user.email)
			res.status(200).json({ 
				message: 'Successfully upgraded your account to Premium!'
			})
		} catch (error) {
			next(error)
		}
	}

	static payment(req, res, next) {
		const midtransClient = require('midtrans-client');
		// Create Snap API instance
		let snap = new midtransClient.Snap({
				// Set to true if you want Production Environment (accept real transaction).
				isProduction: false,
				serverKey: process.env.MIDTRANS_SERVER_KEY
		});

		let orderId = new Date().valueOf();
		
		let parameter = {
			transaction_details: {
				order_id: `order-${orderId}-${req.user.email.slice(0,3)}`,
				gross_amount: 34990
			},
			credit_card:{
				secure : true
			},
			customer_details: {
				email: req.user.email,
				username: req.user.email.split('@')[0]
			}
		};
		
		snap.createTransaction(parameter)
			.then((transaction)=>{
				let transactionToken = transaction.token;
				res.status(201).json({transactionToken});
			})
			.catch((err) => {
				console.log(err);
				next(err);
			})
		}
}

module.exports = {
	UserController
};
