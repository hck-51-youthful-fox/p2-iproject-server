"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  var bcrypt = require("bcryptjs");
  User.beforeCreate((user, options) => {
    // const hashedPassword = await hashPassword(user.password);
    var hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
  });
  return User;
};
