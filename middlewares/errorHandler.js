async function errorHandler(err, req, res, next) {
  let name = err.name;
  let code;
  let msg;
  switch (name) {
    //* Controller
    case "BAD_REQUEST_LOGIN":
      code = 400;
      msg = "Please fill your email and password";
      break;
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      code = 400;
      msg = err.errors[0].message;
      break;
    case "INVALID_CREDENTIALS":
      code = 401;
      msg = "Incorrect email or password";
      break;
    case "DATA_NOT_FOUND":
      code = 404;
      msg = "Error, product not found";
      break;
    case "DATA_NOT_FOUND_CATEGORY":
      code = 404;
      msg = "Error, category not found";
      break;

    //* authentication & authorization
    case "Unauthorized":
    case "JsonWebTokenError":
      code = 401;
      msg = "Please login first";
      break;
    case "Forbidden":
      code = 403;
      msg = "You have no access";
      break;

    default:
      code = 500;
      msg = "Internal Server Error";
      break;
  }
  // output
  res.status(code).json({ msg });
}

module.exports = errorHandler;
