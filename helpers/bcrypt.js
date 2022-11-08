const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 6);
};
const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = { hashPassword, comparePassword };
