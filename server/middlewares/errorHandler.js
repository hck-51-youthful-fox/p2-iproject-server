const errorHandler = (err, req, res, next) => {
	let name = err.name
	let code;
	let msg;
	switch (name) {
		case 'EMPTY_EMAIL':
			code = 400;
			msg = 'Email is required'
			break;
		case 'EMPTY_PASSWORD':
			code = 400;
			msg = 'Password is required'
			break;
		case 'SequelizeUniqueConstraintError':
		case 'SequelizeValidationError':
			code = 400;
			// msg = err.errors.map(el => el.message)
			msg = err.errors[0].message;
			break;
		case 'INVALID_CREDENTIALS':
			code = 401;
			msg = 'Invalid email or password';
			break;
		case 'UNAUTHORIZED':
		case 'JsonWebTokenError':
			code = 401;
			msg = 'Please login first';
			break;
		case 'FORBIDDEN':
			code = 403;
			msg = `You have no access to ${err.action} this product`;
			break;
		case 'NOT_PREMIUM':
			code = 403;
			msg = `Subscribe to our premium plan to access this page`;
			break;
		case 'DATA_NOT_FOUND':
			code = 404;
			msg = `Cannot find ${err.model}`;
			break;
		default: 
			code = 500;
			msg = 'Internal Server Error'
			break;
	}
	console.log(err);
	res.status(code).json({ message: msg })
}

module.exports = {
	errorHandler
};