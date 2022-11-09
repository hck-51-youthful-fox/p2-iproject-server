const ErrorHandler = async (error, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";

  // console.log(error, "<-- dari error handler");

  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = error.errors.map((e) => e.message);
  } else if (error.name === "Email is required") {
    code = 400;
    message = "Email is required";
  } else if (error.name === "Password is required") {
    code = 400;
    message = "Password is required";
  } else if (
    error.name === "JsonWebTokenError" ||
    error.name === "Unauthorized"
  ) {
    code = 401;
    message = "Invalid Token";
  } else if (
    error.name === "invalid email/password" ||
    error.name === "nggak bisa masuk dong"
  ) {
    code = 401;
    message = "Invalid email or password";
  } else if (error.name === "forbidden") {
    code = 403;
    message = "Unauthorized";
  } else if (error.name === "User not found") {
    code = 404;
    message = "User Not Found";
  } else if (error.name === "Not Found") {
    code = 404;
    message = "Notes not found";
  } else if (error.name === "Notes Not Found") {
    code = 404;
    message = "Cant read this Notes";
  }

  res.status(code).json({ error: { message: message } });
};

module.exports = ErrorHandler;
