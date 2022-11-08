const errorHandler = (err, req, res, next) => {
	let code;
	let message;

	switch (err.name) {
		case `SequelizeValidationError`:
		case `SequelizeUniqueConstraintError`:
			code = 400;
			message = err.errors.map((el) => el.message);
			break;
		case `BAD_PATCH_REQUEST`:
		case `BAD_LOGIN_REQUEST`:
		case `BAD_PATCH_REQUEST`:
		case `BAD_FAVORITE_REQUEST`:
		case `INCOMPLETE_DETAILS`:
		case `INVALID_EMAIL`:
		case `ALREADY_VERIFIED`:
			code = 400;
			message = err.message;
			break;
		case `JsonWebTokenError`:
		case `INVALID_ACCESS`:
			code = 401;
			message = "Unauthorized action!";
			break;
		case `INVALID_CREDENTIALS`:
			code = 401;
			message = "Invalid Email or password!";
			break;
		case `FORBIDDEN`:
			code = 403;
			message = "Invalid access!";
			break;
		case `DATA_NOT_FOUND`:
			code = 404;
			message = `Movie with id ${err.id} not Found!`;
			break;
		case `DATA_NOT_FOUND_GENRE`:
			code = 404;
			message = `Genre with id ${err.id} not Found!`;
			break;
		default:
			code = 500;
			message = "Internal Server Error!";
			break;
	}
	res.status(code).json({ message });
};

module.exports = { errorHandler };
