function errorHandler(error, req, res, next) {
  let name = error.name;
  let code;
  let message;

  switch (name) {
    case "bad_request_login":
      code = 400;
      message = "Required input email and password";
      break;
    case "SequelizeValidationError":
      code = 400;
      message = error.errors.map((el) => el.message);
      break;
    case "SequelizeUniqueConstraintError":
      code = 400;
      message = error.errors.map((el) => el.message);
      break;
    default:
      code = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(code).json({ message });
}
module.exports = errorHandler;
