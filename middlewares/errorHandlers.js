function errorsHandler(err, req, res, next) {
  let name = err.name;
  let code;
  let message;
  console.log(err);

  switch (name) {
    case "SequelizeValidationError":
      code = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeUniqueConstraintError":
      code = 400;
      message = err.errors[0].message;
    case "invalid_credentials":
      code = 401;
      message = "Invalid email or password";
      break;
    case "JsonWebTokenError":
      code = 401;
      message = "Unauthorized";
      break;
    default:
      code = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(code).json({ message });
}

module.exports = errorsHandler;
