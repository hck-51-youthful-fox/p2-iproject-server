const errorHandler = async function (err, req, res, next) {
	const { name } = err;
	let code, message;

	switch (name) {
		case "SequelizeValidationError":
		case "SequelizeUniqueConstraintError":
			code = 400
			message = err.errors[0].message
			break
		case "PasswordNotMatch":
			code = 401
			message = "Password dan Repassword tidak sama"
			break
		case "InvalidCredentials":
			message = "Email atau password tidak sama"
			break
		default:
			code = 500
			message = "Internal Server Error"
			break
	}
	res.status(code).json({ message })
}

module.exports = errorHandler