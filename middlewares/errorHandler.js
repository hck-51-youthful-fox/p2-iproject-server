const errorHandler = (err, req, resp, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      let error = [];
      err.errors.forEach((e) => {
        error.push(e.message);
      });
      resp.status(400).json({ msg: error.join(" ") });
      break;

    case "SequelizeUniqueConstraintError":
      resp.status(400).json({ msg: "Data must be unique!" });
      break;

    case "favorite_exist":
      resp
        .status(400)
        .json({ msg: "This movie has already been added to your favorites!" });
      break;

    case "user_input_missing":
      resp
        .status(400)
        .json({ msg: "Please input email and password for login" });
      break;

    case "JsonWebTokenError":
      resp.status(401).json({ msg: "Invalid access token" });
      break;

    case "invalid_credential":
      resp.status(401).json({ msg: "Invalid email or password" });
      break;

    case "invalid_access":
      resp.status(401).json({ msg: "Invalid access token" });
      break;

    case "forbidden":
      resp.status(403).json({ msg: "You are forbidden to do this action!" });
      break;

    case "not_found":
      resp.status(404).json({ msg: "user data not found" });
      break;

    default:
      resp.status(500).json({ msg: "Internal server error!" });
      break;
  }
};

module.exports = errorHandler;
