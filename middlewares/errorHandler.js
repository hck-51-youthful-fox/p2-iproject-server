const errorHandler = (err, req, res, next) => {
  let name = err.name;
  let code;
  let message;
  let messages = []
  switch (name) {
    case "JsonWebTokenError":
      code = 401;
      message = "You are not logged in";
      break;
    case "SequelizeValidationError":
      err.errors.forEach(el =>messages.push(el.message))
      code = 400;
      message = messages;
      break;
    case "SequelizeUniqueConstraintError":
      code = 400;
      message = err.errors[0].message;
      break;
    case "invalid_credentials":
      code = 401;
      message = "Invalid username or password";
      break;
    case "Forbidden":
      code = 403;
      message = "Forbidden access";
      break;
    case "DATA_NOT_FOUND":
      code = 404;
      message = `Data is not found`;
      break;
    case "Unauthorized":
      code = 401;
      message = "You are not authorized";
      break;
    default:
      code = 500;
      message = "Internal Server Error";
      break;
  }
  res.status(code).json({ message });
};

module.exports = errorHandler;
