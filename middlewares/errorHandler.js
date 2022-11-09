const errorHandler = (error, req, res, next) => {
  let name = error.name;
  let code;
  let msg;

  switch (name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      code = 400;
      msg = error.errors.map((el) => {
        return el.message;
      });
      break;
    case "Invalid credentials":
      code = 401;
      msg = "Invalid Email or Password";
      break;
    case "DATA_NOT_FOUND":
      code = 404;
      msg = `Data with id ${error.id} is not found`;
      break;
    case "cant access token":
    case "JsonWebTokenError":
      code = 401;
      msg = `please login first`;
      break;
    case "forbidden":
      code = 403;
      msg = `you have no access`;
      break;
    default:
      code = 500;
      msg = "Internal Server Error";
      break;
  }
  res.status(code).json({ msg });
};

module.exports = { errorHandler };
